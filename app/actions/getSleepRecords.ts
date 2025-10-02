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
  data?: ChartData;
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
  if (!user) return { error: "User not found" };

  try {
    const records = await db.record.findMany({
      where: { userId: user.clerkUserId },
      orderBy: { date: "asc" },
    });

    if (!records || records.length === 0) {
      return { error: "No records found" };
    }

    const lineData = [
      {
        id: "Sleep Cycles",
        data: records.map((r:any) => ({
          x: formatDateLabel(r.date),
          y: r.duration,
        })),
      },
    ];

    const barData = records.map((r:any) => ({
      day: formatDateLabel(r.date),
      hours: r.duration,
    }));

    return { data: { lineData, barData } };
  } catch (error) {
    console.error("Error fetching sleep data:", error);
    return {
      error: "An unexpected error occurred while fetching sleep data.",
    };
  }
}

export default getSleepRecords;
