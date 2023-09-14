import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import * as React from "react";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);
  const idRef = React.useRef(0);

  const toast = React.useCallback((props: ToasterToast) => {
    setToasts((prev) => [...prev, props]);
  }, []);

  return { idRef, toast, toasts };
}

export { useToast };
