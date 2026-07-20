import toast from "react-hot-toast";

export type ToastType = "success" | "error" | "info";

export type AppToastParams = {
  title: string;
  message?: string;
};

export function useAppToast() {
  const show = (type: ToastType, { title, message }: AppToastParams) => {
    const text = message ? `${title}\n${message}` : title;

    switch (type) {
      case "success":
        toast.success(text);
        break;

      case "error":
        toast.error(text);
        break;

      case "info":
        toast(text);
        break;
    }
  };

  const success = (params: AppToastParams) => {
    show("success", params);
  };

  const error = (params: AppToastParams) => {
    show("error", params);
  };

  const info = (params: AppToastParams) => {
    show("info", params);
  };

  return {
    success,
    error,
    info,
  };
}
