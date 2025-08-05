"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>;
    </SessionProvider>
  );
}
