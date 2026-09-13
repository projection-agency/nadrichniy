"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import s from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  /** Max chars for the last crumb on mobile only */
  maxLastLabelLengthMobile?: number;
}

function truncateLabel(label: string, maxLength: number): string {
  const text = (label || "").trim();
  if (maxLength <= 0 || text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(1, maxLength - 1)).trimEnd()}…`;
}

export default function Breadcrumbs({
  items,
  maxLastLabelLengthMobile = 28,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const lastIndex = items.length - 1;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <nav className={s.breadcrumbs}>
      {items.map((item, index) => {
        const label =
          index === lastIndex && isMobile
            ? truncateLabel(item.label, maxLastLabelLengthMobile)
            : item.label;

        return (
          <span key={index} className={s.breadcrumbItem}>
            {item.href ? (
              <Link href={item.href}>{label}</Link>
            ) : (
              <span>{label}</span>
            )}
            {index < lastIndex && <span className={s.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
