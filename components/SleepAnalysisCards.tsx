"use client";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAlertStore } from "@/store/useAlertStore";
import { AIInsight, SleepAnalytics, SleepRecord } from "@/types/types";
import { analyzeSleepAction } from "@/app/actions/sleepAnalysis";

interface Props {
  sleepData: SleepAnalytics;
}

export default function SleepAnalysisCards({ sleepData }: Props) {
  const { addAlert } = useAlertStore();
  const [insights, setInsights] = useState<AIInsight[]>([]);

  const mutation = useMutation({
    mutationFn: (records: SleepRecord[]) => analyzeSleepAction(records),
    onSuccess: (data) => setInsights(data),
    onError: (err: any) =>
      addAlert(`Ошибка при анализе сна: ${err.message}`, "error"),
  });

  const analyzeSleep = () => {
    if (!sleepData.recentRecords.length) return;
    mutation.mutate(sleepData.recentRecords);
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={analyzeSleep}
          disabled={mutation.isPending}
          className="px-6 py-2 text-white rounded border-2 border-[#1173d4] hover:border-[#0e5fa8] transition"
        >
          {mutation.isPending ? "Анализируем..." : "Проанализировать сон"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Всего записей сна" value={sleepData.totalRecords} />
        <StatCard
          title="Средняя продолжительность сна"
          value={`${sleepData.averageDuration.toFixed(1)} часов`}
        />
        <StatCard
          title="Минимальный сон"
          value={`${sleepData.shortestSleep.toFixed(1)} часов`}
        />
        <StatCard
          title="Максимальный сон"
          value={`${sleepData.longestSleep.toFixed(1)} часов`}
        />

        <div className="p-4 rounded shadow col-span-full border-2 border-gray-700 bg-gray-700">
          <h3 className="text-lg font-bold mb-4">Последние записи сна</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sleepData.recentRecords.map((r, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg border border-[#1173d4] shadow-sm"
              >
                <div className="flex-shrink-0 p-2 bg-[#1173d4]/20 rounded-full">
                  <CalendarDays className="w-6 h-6 text-[#1173d4]" />
                </div>
                <div>
                  <p className="text-white font-semibold">{r.date}</p>
                  <p className="text-sm text-gray-300">
                    {r.duration.toFixed(1)} ч
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {insights.map((i) => (
          <div
            key={i.id}
            className="p-4 rounded shadow col-span-full border-gray-700 bg-gray-700"
          >
            <h3 className="text-lg font-bold mb-2">{i.title}</h3>
            <p className="text-white">{i.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-4 rounded shadow border-2 border-gray-700 bg-gray-700">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-white">{value}</p>
    </div>
  );
}
