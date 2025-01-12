import React from 'react';
import { cn } from "@/lib/utils";

export function Spinner({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-gray-200 border-t-black",
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
