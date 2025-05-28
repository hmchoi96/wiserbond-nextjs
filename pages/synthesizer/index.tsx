// pages/synthesizer/index.tsx
import { useState } from "react";
import ReportSection from "@/components/ReportSection"; // ✅ 이건 파일 최상단에 위치해야 함

export default function SynthesizerPage() {
  const [topic, setTopic] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("English");
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    exec_summary: "",
    big: "",
    mid: "",
    small: "",
    interpretation: ""
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, industry, country, language, isPro })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Wiserbond Synthesizer</h1>

      <div className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Topic (e.g. Inflation)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Industry (e.g. Supply Chain)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Country (e.g. Canada)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <select
          className="w-full border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Korean">Korean</option>
          <option value="Spanish">Spanish</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPro}
            onChange={() => setIsPro(!isPro)}
          />
          Pro Mode (expert-level explanation)
        </label>
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {/* 결과 카드 출력 */}
      <div className="space-y-4">
        {Object.entries(result).map(([key, value]) => (
          <ReportSection key={key} title={key} content={value} />
        ))}
      </div>
    </div>
  );
}
