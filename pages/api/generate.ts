import type { NextApiRequest, NextApiResponse } from 'next';
import { callGPT } from '@/lib/gpt';
import { getContextualPapers } from '@/lib/getContextualPapers';
import { getProjectionPapers } from '@/lib/getProjectionPapers';

import { getBigPrompt } from '@/lib/prompts/getBigPrompt';
import { getMidPrompt } from '@/lib/prompts/getMidPrompt';
import { getSmallPrompt } from '@/lib/prompts/getSmallPrompt';
import { getInterpretationPrompt } from '@/lib/prompts/getInterpretationPrompt';
import { getExecutiveSummaryPrompt } from '@/lib/prompts/getExecutiveSummaryPrompt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    topic,
    industry,
    country,
    language = "English",
    current_date = new Date().toISOString().split("T")[0],
    isPro = false,
    subIndustry = "",
    situation = "",
    goal = "",
    followup_questions = [],
    followup_answers = [],
    user_analysis = "",
    user_forecast = "",
    internal_comment = ""
  } = req.body;

  if (!topic || !industry || !country) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Step 1: Academic Paper Fetching
  const contextPapers = await getContextualPapers(topic, industry, country, subIndustry, situation, goal, followup_questions.join(" "));
  const projectionPapers = await getProjectionPapers(topic, industry, country, subIndustry, situation, goal, followup_questions.join(" "));

  const academicSummary = (papers: { title: string; summary: string; doi: string }[]) =>
    papers.map((p, i) => `Insight ${i + 1}: ${p.summary} (Source: ${p.doi})`).join('\n\n');

  const academicContext = academicSummary(contextPapers);
  const academicProjection = academicSummary(projectionPapers);

  // Step 2: Shared Prompt Params
  const sharedParams = {
    topic,
    industry,
    country,
    language,
    current_date,
    situation,
    goal,
    industry_detail: subIndustry,
    followup_questions,
    followup_answers,
    is_pro: isPro,
    academicContext
  };

  // Step 3: Generate Prompts and Call GPT
  const [big, mid, small] = await Promise.all([
    callGPT(getBigPrompt(sharedParams)),
    callGPT(getMidPrompt(sharedParams)),
    callGPT(getSmallPrompt(sharedParams))
  ]);

  const interpretationPrompt = getInterpretationPrompt({
    ...sharedParams,
    academicProjection,
    big_picture: big,
    mid_picture: mid,
    small_picture: small,
    internal_comment,
    user_analysis,
    user_forecast
  });

  const interpretation = await callGPT(interpretationPrompt);

  const summaryPrompt = getExecutiveSummaryPrompt({
    ...sharedParams,
    big_picture: big,
    mid_picture: mid,
    small_picture: small,
    interpretation
  });

  const exec_summary = await callGPT(summaryPrompt);

  // Step 4: Return card-based result
  res.status(200).json({
    cards: [
      { id: "exec_summary", title: "Executive Summary", type: "summary", content: exec_summary },
      { id: "big", title: "Big Picture", type: "analysis", content: big },
      { id: "mid", title: "Mid Picture", type: "analysis", content: mid },
      { id: "small", title: "Small Picture", type: "news", content: small },
      { id: "interpretation", title: "Strategic Outlook", type: "insight", content: interpretation }
    ]
  });
}
