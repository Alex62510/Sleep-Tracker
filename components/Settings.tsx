"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

export default function Settings() {
  const [name, setName] = useState("Моё имя");
  const [notifications, setNotifications] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmTime, setAlarmTime] = useState("07:00");
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [alarmSoundEnabled, setAlarmSoundEnabled] = useState(false); // Новый Toggle

  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const { user } = useUser();
  const [alarmRinging, setAlarmRinging] = useState(false);
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // форматирование времени
  const formatTime = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return min > 0 ? `${min} мин ${sec} сек` : `${sec} сек`;
  };

  const toggleTimerRun = () => {
    if (isRunning) {
      setIsRunning(false);
      setStoppedAt(Math.floor(elapsedMs / 1000));
    } else {
      setElapsedMs(0);
      setStoppedAt(null);
      setIsRunning(true);
      startTimeRef.current = performance.now();
    }
  };

  // таймер
  useEffect(() => {
    const tick = (now: number) => {
      if (isRunning && startTimeRef.current !== null) {
        setElapsedMs(now - startTimeRef.current);
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (isRunning) {
      startTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning]);

  // инициализация звука будильника после клика пользователя
  const enableAlarmAudio = () => {
    if (alarmAudioRef.current) {
      alarmAudioRef.current
        .play()
        .then(() => {
          alarmAudioRef.current?.pause();
          alarmAudioRef.current!.currentTime = 0;
        })
        .catch((err) => console.error("Ошибка автоплей:", err));
    }
  };

  // логика будильника
  useEffect(() => {
    if (!alarmEnabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const [hours, minutes] = alarmTime.split(":").map(Number);
      if (
        now.getHours() === hours &&
        now.getMinutes() === minutes &&
        now.getSeconds() === 0
      ) {
        setAlarmRinging(true);
        if (alarmSoundEnabled && alarmAudioRef.current) {
          alarmAudioRef.current
            .play()
            .catch((err) =>
              console.error("Не удалось проиграть звук будильника:", err),
            );
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmEnabled, alarmTime, alarmSoundEnabled]);

  const stopAlarm = () => {
    setAlarmRinging(false);
    if (alarmAudioRef.current) {
      alarmAudioRef.current.pause();
      alarmAudioRef.current.currentTime = 0;
    }
  };

  const handleSave = () => {
    console.log("Сохраняем:", {
      name,
      notifications,
      alarmEnabled,
      alarmTime,
      timerEnabled,
      alarmSoundEnabled,
      elapsedMs,
      stoppedAt,
    });
    alert("Настройки сохранены ✅");
  };

  const handleCancel = () => {
    alert("Изменения отменены ❌");
  };

  function Toggle({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
  }) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200
          ${checked ? "bg-[#1173d4]" : "bg-gray-600"} focus:outline-none focus:ring-2 focus:ring-[#1173d4]/50`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform duration-200
            ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    );
  }

  const secondsTotal = Math.floor(elapsedMs / 1000);
  const angle = (elapsedMs / 1000) * 6;

  return (
    <div className="w-full min-h-[calc(100vh-60px)] p-46 flex flex-col rounded shadow space-y-6">
      <h2 className="text-xl font-bold text-white mb-2">Настройки</h2>

      {/* Имя */}
      <div className={"flex flex-col"}>
        <span>{user?.fullName}</span>
        <span>{user?.primaryEmailAddress?.emailAddress}</span>
      </div>

      {/* Уведомления */}
      <div className="flex items-center justify-between">
        <span className="text-white">Получать уведомления</span>
        <Toggle checked={notifications} onChange={setNotifications} />
      </div>

      {/* Будильник */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-white">Будильник</span>
          <Toggle
            checked={alarmEnabled}
            onChange={(v) => {
              setAlarmEnabled(v);
              if (v) enableAlarmAudio(); // разрешаем звук после клика
            }}
          />
        </div>

        {alarmEnabled && (
          <div className="flex items-center gap-4">
            <label className="text-white">Время срабатывания</label>
            <div className="relative">
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                id="alarmTime"
                className="px-3 py-2 rounded border-2 border-[#1173d4] bg-transparent text-white focus:outline-none
                  hover:border-[#2891f2] hover:ring-1 hover:ring-[#2891f2] peer appearance-none"
              />
              <span
                onClick={() => {
                  const input = document.getElementById(
                    "alarmTime",
                  ) as HTMLInputElement | null;
                  input?.showPicker?.();
                }}
                className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#1173d4] cursor-pointer
                  transition-transform duration-300 peer-focus:animate-pulse"
              >
                schedule
              </span>
            </div>
          </div>
        )}

        {/* Toggle включения звука будильника */}
        {alarmEnabled && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-white">Включить звук будильника</span>
            <Toggle
              checked={alarmSoundEnabled}
              onChange={setAlarmSoundEnabled}
            />
          </div>
        )}
      </div>

      {/* Таймер */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-white">Таймер</span>
          <Toggle checked={timerEnabled} onChange={setTimerEnabled} />
        </div>

        {timerEnabled && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <svg className="w-32 h-32 text-white" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="white"
                  strokeWidth="2"
                  fill="transparent"
                />
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="15"
                  stroke="#1173d4"
                  strokeWidth="2"
                  transform={`rotate(${angle} 50 50)`}
                />
              </svg>

              <div className="flex flex-col gap-2 text-white">
                <span>Текущее время: {formatTime(secondsTotal)}</span>
                {stoppedAt !== null && (
                  <span>Остановлено на: {formatTime(stoppedAt)}</span>
                )}
                <button
                  onClick={toggleTimerRun}
                  className="px-4 py-2 rounded bg-[#1173d4] hover:bg-[#0d5fb4] transition"
                >
                  {isRunning ? "Остановить" : "Запустить"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Кнопки */}
      <div className="mt-auto flex justify-end gap-4 pt-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2 rounded border-2 border-[#1173d4] text-white hover:bg-[#1173d4]/10 transition"
        >
          Отмена
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded bg-[#1173d4] text-white hover:bg-[#0d5fb4] transition"
        >
          Сохранить
        </button>
      </div>

      {/* Модалка будильника */}
      {alarmRinging && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/80">
          <img
            src="/alarm.png"
            alt="Будильник"
            className="w-64 h-64 mb-6 animate-pulse"
          />
          <button
            onClick={stopAlarm}
            className="px-6 py-3 bg-[#1173d4] text-white rounded text-lg hover:bg-[#0d5fb4] transition"
          >
            Отключить
          </button>
        </div>
      )}

      {/* Аудио сигнал */}
      <audio ref={alarmAudioRef} src="/alarm-sound.mp3" loop />
    </div>
  );
}
