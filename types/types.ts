export interface SleepRecord {
  date: string;
  duration: number;
}

export interface SleepAnalytics {
  totalRecords: number;
  averageDuration: number;
  shortestSleep: number;
  longestSleep: number;
  recentRecords: SleepRecord[];
}

export interface AIInsight {
  id: string;
  type: "info" | "tip" | "warning" | "success";
  title: string;
  message: string;
  confidence: number;
}
