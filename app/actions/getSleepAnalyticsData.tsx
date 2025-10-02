"use server";

import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

interface SleepRecord {
  date: string;
  duration: number;
}

interface SleepAnalytics {
  totalRecords: number;
  averageDuration: number;
  shortestSleep: number;
  longestSleep: number;
  recentRecords: SleepRecord[];
}

async function getSleepAnalyticsData(): Promise<
  SleepAnalytics | { error: string }
> {
  const user = await checkUser();
  if (!user) return { error: "User not found" };

  const records = await db.record.findMany({
    where: { userId: user.clerkUserId },
    orderBy: { date: "desc" },
  });

  if (!records || records.length === 0) {
    return { error: "No records found" };
  }

  const durations = records.map((r:any) => r.duration);
  const totalRecords = records.length;
  const averageDuration = durations.reduce((a:any, b:any) => a + b, 0) / totalRecords;
  const shortestSleep = Math.min(...durations);
  const longestSleep = Math.max(...durations);

  const recentRecords = records.slice(0, 7).map((r:any) => ({
    date: r.date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }),
    duration: r.duration,
  }));

  return {
    totalRecords,
    averageDuration,
    shortestSleep,
    longestSleep,
    recentRecords,
  };
}

export default getSleepAnalyticsData;
