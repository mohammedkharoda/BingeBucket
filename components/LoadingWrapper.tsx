"use client";

import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

type LoadingWrapperProps = {
  children: React.ReactNode;
};

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoading && <LoadingPage />}
      {children}
    </>
  );
}
