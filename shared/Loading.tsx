"use client";

import "ldrs/ring";
import { quantum } from "ldrs";

// Default values shown
const Loading = () => {
  // ldrs loader
  quantum.register();

  return (
    <div className="h-full flex items-center justify-center">
      <l-quantum color="black" size="45" speed="1.75" />
    </div>
  );
};

export default Loading;

// Default values shown
