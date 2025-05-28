// lib/gpt.ts
export async function callGPT(prompt: string): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });
  
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "⚠️ No response from GPT.";
  }
  