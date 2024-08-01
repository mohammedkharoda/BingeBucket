"use client";

import "ldrs/ring";
import { quantum } from "ldrs";

// Default values shown
const Loading = () => {
  // ldrs loader
  quantum.register();
  return (
    <div className="h-full flex items-center justify-center">
      <l-quantum size="45" speed="1.75" color="black"></l-quantum>
    </div>
  );
};

export default Loading;

// Default values shown
