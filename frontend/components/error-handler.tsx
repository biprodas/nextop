"use client"; // Make this a client-side component

import { useEffect } from "react";
import { toast } from "sonner";

interface ErrorHandlerProps {
  error: string | null;
}

const ErrorHandler = ({ error }: ErrorHandlerProps) => {
  useEffect(() => {
    if (error) {
      console.log(error);

      toast(error);
    }
  }, [error]);

  return null;
};

export default ErrorHandler;
