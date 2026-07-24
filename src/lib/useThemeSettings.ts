"use client";

import { useEffect, useState } from "react";
import {
  fetchThemeSettings,
  type ThemeSettings,
} from "@/lib/themeSettings";

export function useThemeSettings() {
  const [settings, setSettings] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchThemeSettings()
      .then((data) => {
        if (alive) setSettings(data);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { settings: settings ?? {}, loading };
}
