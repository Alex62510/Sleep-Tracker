"use client";
import { useQuery } from "@tanstack/react-query";
import { useAlertStore } from "@/store/useAlertStore";
import getSleepAnalyticsData from "@/app/actions/getSleepAnalyticsData";
import SleepAnalysisCards from "@/components/SleepAnalysisCards";
import Spinner from "@/components/Spinner";

export default function AnalysisPage() {
  const { addAlert } = useAlertStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sleepAnalytics"],
    queryFn: async () => {
      const result = await getSleepAnalyticsData();
      if ("error" in result) throw new Error(result.error);
      addAlert("Ошибка получения данных", "error");
      return result;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading) return <Spinner size={12} centered />;

  if (!data) return <div className={'min-h-[300px] flex items-center justify-center'}>Данные о сне отсутствуют</div>;

  return <SleepAnalysisCards sleepData={data} />;
}
