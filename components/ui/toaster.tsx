"use client";

import React from "react";
import { Toaster } from "sonner";

export function AppToaster(): React.ReactElement {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        className: "bg-white text-gray-900 border border-gray-200 shadow-lg shadow-gray-950/5",
      }}
    />
  );
}

