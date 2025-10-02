"use client";
import React, { useState, useRef, useEffect } from "react";
import { format, addMinutes, parse, differenceInMinutes } from "date-fns";
import { useAlertStore } from "@/store/useAlertStore";
import Alert from "@/components/Alert";
import createSleepRecord from "@/app/actions/createSleepRecord";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddSleepEntry = () => {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState("23:00");
  const [duration, setDuration] = useState(8);
  const [endTimeManual, setEndTimeManual] = useState("");
  const [notes, setNotes] = useState("");

  const addAlert = useAlertStore((state) => state.addAlert);
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await createSleepRecord(formData);
    },
    onSuccess: (data) => {
      if (data?.error) {
        addAlert("Ошибка сохранения записи сна!", "error");
      } else {
        addAlert("Данные сна сохранены!", "success");
        formRef.current?.reset();
        setDuration(0);
        setNotes("");
        setEndTimeManual("");
        queryClient.invalidateQueries({ queryKey: ["sleepData"] });
      }
    },
    onError: () => {
      addAlert("Произошла ошибка при сохранении сна 😕", "error");
    },
  });

  const endTime =
    endTimeManual ||
    (() => {
      const [hours, mins] = startTime.split(":").map(Number);
      const startDate = new Date();
      startDate.setHours(hours, mins);
      const newEndDate = addMinutes(startDate, duration * 60);
      return format(newEndDate, "HH:mm");
    })();

  useEffect(() => {
    if (!endTimeManual) return;
    const start = parse(startTime, "HH:mm", new Date());
    const end = parse(endTimeManual, "HH:mm", new Date());

    let diff = differenceInMinutes(end, start);
    if (diff < 0) diff += 24 * 60;

    setDuration(diff / 60);
  }, [startTime, endTimeManual]);

  return (
    <main className="flex justify-center py-12  dark:bg-gray-800 min-h-[calc(100vh-4rem)]">
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          mutate(formData);
        }}
        className="w-full max-w-2xl px-4 mx-auto"
      >
        <div className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-200 mb-8">
            Добавить запись сна
          </h1>

          <div className="mb-6 relative">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-200 dark:text-gray-200 mb-2"
            >
              Дата сна
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="hover:border-[#2891f2] hover:ring-1 hover:ring-[#2891f2]
              peer form-input w-full rounded-lg border-2 border-[#1173d4] h-12 px-4 pr-12 text-gray-200 bg-gray-900 dark:bg-gray-700 dark:text-gray-100 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[#1173d4] focus:ring-opacity-50 transition-all duration-300 appearance-none
              [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-clear-button]:appearance-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) =>
                (e.currentTarget as HTMLInputElement).showPicker?.()
              }
            />

            <span
              onClick={() => {
                const input = document.getElementById(
                  "date",
                ) as HTMLInputElement | null;
                input?.showPicker?.();
              }}
              className="
              material-symbols-outlined absolute right-4 top-12 -translate-y-1/2 text-[#1173d4] cursor-pointer
              transition-transform duration-300 "
            >
              calendar_today
            </span>
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-200 dark:text-gray-200 mb-2"
            >
              Время начала сна
            </label>

            <input
              type="time"
              id="startTime"
              name="startTime"
              className="hover:border-[#2891f2] hover:ring-1 hover:ring-[#2891f2]
              peer form-input  rounded-lg border-2 border-[#1173d4] h-12 px-4 pr-12 text-gray-200 bg-gray-900 dark:bg-gray-700 dark:text-gray-100
              cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1173d4] focus:ring-opacity-50 transition-all duration-300 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

            <span
              onClick={() => {
                const input = document.getElementById(
                  "startTime",
                ) as HTMLInputElement | null;
                input?.showPicker?.();
              }}
              className="material-symbols-outlined absolute left-35 top-13 -translate-y-1/2 text-[#1173d4] cursor-pointer
              transition-transform duration-300 peer-focus:animate-pulse"
            >
              schedule
            </span>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Продолжительность сна
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={14 * 60}
                value={duration * 60}
                onChange={(e) => {
                  const totalMinutes = Number(e.target.value);
                  setDuration(totalMinutes / 60); // дробные часы
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1173d4]"
              />

              <input
                type="number"
                min={0}
                max={14}
                name="duration"
                value={parseFloat(duration.toFixed(2))}
                step={0.01}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="hover:border-[#2891f2] hover:ring-1 hover:ring-[#2891f2]
                w-16 text-center rounded-lg border-2 border-[#1173d4] bg-gray-900 text-gray-200 px-1 focus:outline-none focus:ring-2 focus:ring-[#1173d4]"
              />
              <span className="text-gray-200">ч</span>
            </div>
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-200 dark:text-gray-200 mb-2"
            >
              Время окончания сна
            </label>

            <input
              type="time"
              id="endTime"
              name="endTime"
              className="hover:border-[#2891f2] hover:ring-1 hover:ring-[#2891f2]
              peer form-input  rounded-lg border-2 border-[#1173d4] h-12 px-4 pr-12 text-gray-200 bg-gray-900 dark:bg-gray-700 dark:text-gray-100
              cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1173d4] focus:ring-opacity-50 transition-all duration-300 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
              value={endTime}
              onChange={(e) => setEndTimeManual(e.target.value)}
            />

            <span
              onClick={() => {
                const input = document.getElementById(
                  "endTime",
                ) as HTMLInputElement | null;
                input?.showPicker?.();
              }}
              className="material-symbols-outlined absolute left-35 top-13 -translate-y-1/2 text-[#1173d4] cursor-pointer
              transition-transform duration-300 peer-focus:animate-pulse"
            >
              schedule
            </span>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Заметки о сне
            </label>
            <textarea
              value={notes}
              name="notes"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Например: 'Сон был тревожным' или 'Проснулся отдохнувшим'"
              className="hover:border-[#2891f2] hover:ring-1 hover:ring-[#2891f2]
              w-full rounded-lg border-2 border-[#1173d4] h-36 p-4 text-gray-200 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1173d4] resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer rounded-lg h-12 px-6 bg-[#1173d4] text-white font-bold hover:bg-blue-700 transition-colors"
            >
              Сохранить запись
            </button>
          </div>
        </div>
      </form>

      <Alert />
    </main>
  );
};

export default AddSleepEntry;
