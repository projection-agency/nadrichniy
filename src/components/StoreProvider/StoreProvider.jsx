"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/Redux/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
