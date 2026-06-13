"use client";

import LoadingWrapper from "@/components/common/LoadingWrapper";

export default function SeriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingWrapper>
      <section className="relative w-full">
        {children}
      </section>
    </LoadingWrapper>
  );
}
