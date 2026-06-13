interface DateFormatOptions {
  day: "2-digit" | "numeric";
  month: "short" | "long" | "numeric";
  year: "numeric" | "2-digit";
}

export function formatDate(dateString: string): string {
  if (!dateString) return "N/A"; // handle cases where dateString is not defined

  const date = new Date(dateString);
  const options: DateFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // Use toLocaleDateString to format the date
  return date.toLocaleDateString("en-GB", options);
}
