"use client";

import { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useAlertStore } from "@/store/useAlertStore";
import getSleepRecords from "@/app/actions/getSleepRecords";
import Chart from "@/components/Chart";
import { useQuery } from "@tanstack/react-query";

export default function SleepDataPage() {
  const { addAlert } = useAlertStore();

  const { data, isPending, error } = useQuery({
    queryKey: ["sleepData"],
    queryFn: async () => {
      const result = await getSleepRecords();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data ?? { lineData: [], barData: [] };
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // Вызов addAlert только после рендера
  useEffect(() => {
    if (error) {
      addAlert("Произошла ошибка при загрузке данных сна 😕", "error");
    } else if (data && data.lineData.length === 0 && data.barData.length === 0) {
      addAlert("Данные сна отсутствуют 😴", "error");
    }
  }, [data, error, addAlert]);

  if (isPending) {
    return (
        <div className="bg-slate-800 min-h-[300px] flex items-center justify-center">
          <Spinner size={12} centered />
        </div>
    );
  }

  if (error) {
    return (
        <div className="bg-slate-800 min-h-[300px] flex items-center justify-center text-white">
          Ошибка загрузки
        </div>
    );
  }

  if (!data || (data.lineData.length === 0 && data.barData.length === 0)) {
    return (
        <div className="bg-slate-800 min-h-[300px] flex items-center justify-center text-white">
          Данные отсутствуют
        </div>
    );
  }

  return <Chart lineData={data.lineData} barData={data.barData} />;
}
