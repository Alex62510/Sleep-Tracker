import { create } from "zustand";

export type AlertType = "success" | "error";

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
}

interface AlertStore {
  alerts: Alert[];
  addAlert: (message: string, type: AlertType) => void;
  removeAlert: (id: string) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (message, type) => {
    const id = crypto.randomUUID();
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }],
    }));
    // Автоудаление через 5 секунд
    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id),
      }));
    }, 5000);
  },
  removeAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
}));
