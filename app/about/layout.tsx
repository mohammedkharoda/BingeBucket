import React, { Suspense } from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <section className="flex flex-col items-center justify-center gap-4 ">
        <div className="inline-block text-center justify-center w-full">
          {children}
        </div>
      </section>
    </Suspense>
  );
}
