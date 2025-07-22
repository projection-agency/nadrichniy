import Link from "next/link";
import s from "./Breadcrumbs.module.css"; // або styled-components / tailwind

export interface BreadcrumbItem {
  label: string;
  href?: string; // якщо немає — просто текст
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className={s.breadcrumbs}>
      {items.map((item, index) => (
        <span key={index} className={s.breadcrumbItem}>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className={s.separator}>/</span>
          )}
        </span>
      ))}
    </nav>
  );
}
