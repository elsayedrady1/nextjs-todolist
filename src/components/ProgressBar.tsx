"use client";

import { Next13ProgressBar as PB } from "next13-progressbar";

function ProgressBar() {
  return <PB color="var(--foreground)" options={{ showSpinner: false }} />;
}

export { ProgressBar };
