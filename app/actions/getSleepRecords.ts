"use server";

import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

interface ChartData {
  lineData: Array<{
    id: string;
    data: Array<{ x: string; y: number }>;
  }>;
  barData: Array<{ day: string; hours: number }>;
}

interface GetSleepResult {
  data: ChartData | null;
  error?: string;
}

function formatDateLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

async function getSleepRecords(): Promise<GetSleepResult> {
  const user = await checkUser();
  if (!user) return { data: null, error: "Пользователь не найден" };

  try {
    const records = await db.record.findMany({
      where: { userId: user.clerkUserId },
      orderBy: { date: "asc" },
    });

    if (!records || records.length === 0) {
      // Возвращаем пустой объект данных вместо ошибки
      return { data: { lineData: [], barData: [] } };
    }

    const lineData = [
      {
        id: "Sleep Cycles",
        data: records.map((r: any) => ({
          x: formatDateLabel(r.date),
          y: r.duration,
        })),
      },
    ];

    const barData = records.map((r: any) => ({
      day: formatDateLabel(r.date),
      hours: r.duration,
    }));

    return { data: { lineData, barData } };
  } catch (error) {
    console.error("Error fetching sleep data:", error);
    return {
      data: null,
      error: "Произошла ошибка при загрузке данных сна",
    };
  }
}

export default getSleepRecords;
