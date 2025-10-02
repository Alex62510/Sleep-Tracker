import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { useAlertStore } from "@/store/useAlertStore";

const Alert = () => {
  const { alerts, removeAlert } = useAlertStore();

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-3 rounded-xl border-l-4 backdrop-blur-sm flex items-center gap-2 transition-all duration-500 transform
                        ${
                          alert.type === "success"
                            ? "bg-cyan-50/80 dark:bg-cyan-900/20 border-l-blue-500 text-cyan-800 dark:text-cyan-200"
                            : "bg-red-50/80 dark:bg-red-900/20 border-l-red-500 text-red-800 dark:text-red-200"
                        }
                        animate-slideIn`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {alert.type === "success" ? (
              <CheckCircleIcon className="w-6 h-6 text-blue-500 dark:text-cyan-200" />
            ) : (
              <ExclamationCircleIcon className="w-6 h-6 text-red-500 dark:text-red-200" />
            )}
          </div>
          <p className="font-medium text-sm">{alert.message}</p>
          <button
            onClick={() => removeAlert(alert.id)}
            className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Alert;
