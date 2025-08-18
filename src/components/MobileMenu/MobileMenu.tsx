"use client";
import s from "./MobileMenu.module.css";
import Container from "../Container/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  { title: "Головна", link: "/" },
  { title: "Каталог", link: "/catalog" },
  { title: "Блог", link: "/blog" },
  { title: "Клієнтам", link: "/clients" },
  { title: "Контакти", link: "/contacts" },
];

export default function MobileMenu({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  return (
    <div className={`${s.mobileMenuOverlay} ${isOpen ? s.isOpen : ""}`}>
      <aside className={s.mobileMenu}>
        <Container>
          <nav className={s.nav}>
            <ul>
              {navLinks.map((item, idx) => {
                return (
                  <li
                    className={`${pathname == item.link ? s.active : ""}`}
                    key={idx}
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </aside>
    </div>
  );
}
