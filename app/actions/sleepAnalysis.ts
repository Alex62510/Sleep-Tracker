"use server";

// вынеси типы отдельно

import { AIInsight, SleepRecord } from "@/types/types";

export async function analyzeSleepAction(
  sleepRecords: SleepRecord[],
): Promise<AIInsight[]> {
  if (!sleepRecords?.length) return [];

  try {
    const prompt = `
Проанализируй последние 7 записей сна:
${sleepRecords.map((r) => `${r.date}: ${r.duration} часов`).join("\n")}

Верни массив инсайтов в формате JSON:
[
  {
    "type": "info|tip|warning|success",
    "title": "Краткий заголовок",
    "message": "Детальный текст совета",
    "confidence": 0.7
  }
]

Возвращай только JSON, без лишнего текста.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Ты аналитик сна, всегда возвращай JSON массив инсайтов.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await res.json();
    let text = data.choices?.[0]?.message?.content || "[]";
    text = text.replace(/^```json\s*|\s*```$/g, "");

    const rawInsights = JSON.parse(text) || [];
    const insights: AIInsight[] = rawInsights.map((i: any, idx: number) => ({
      id: `ai-${Date.now()}-${idx}`,
      type: ["info", "tip", "warning", "success"].includes(i.type)
        ? i.type
        : "info",
      title: i.title || "Совет по сну",
      message: i.message || "",
      confidence: i.confidence ?? 0.7,
    }));

    return insights;
  } catch (err) {
    console.error("Ошибка анализа сна:", err);
    return [];
  }
}
