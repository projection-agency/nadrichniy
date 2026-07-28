"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import s from "./Header.module.css";
import Container from "../Container/Container";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useModal } from "../ModalContext";
import { useThemeSettings } from "@/lib/useThemeSettings";
import SiteLogo from "../SiteLogo/SiteLogo";

const navLinks = [
  { title: "Головна", link: "/" },
  { title: "Каталог", link: "/catalog" },
  { title: "Блог", link: "/blog" },
  { title: "Клієнтам", link: "/clients" },
  { title: "Контакти", link: "/contacts" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const isCatalogPage = pathname.includes("/catalog");
  const { openModal } = useModal();
  const { settings } = useThemeSettings();
  const phones = [settings.input_text_phone_1, settings.input_text_phone_2]
    .map((v) => (v || "").trim())
    .filter(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openMenu = () => {
    setMobileMenuIsOpen(true);
  };

  const closeMenu = () => {
    setMobileMenuIsOpen(false);
  };

  const isClientsPage =
    pathname === "/clients" || pathname.startsWith("/clients/");

  const isBlogPage =
    pathname === "/blog" || pathname.startsWith("/blog/");

  const isContactsPage = pathname === "/contacts";

  const isLightPage =
    isBlogPage ||
    isContactsPage ||
    pathname === "/privacy-policy";

  const useForcedStaticLogo =
    isClientsPage || isBlogPage || isContactsPage;

  // Light chrome → static (colored) logo; dark hero → scroll (white text) logo.
  const useStaticLogo =
    (isScrolled && !mobileMenuIsOpen) ||
    (isLightPage && !mobileMenuIsOpen);

  return (
    <>
      <header
        className={`${s.header}   
        ${isScrolled && !mobileMenuIsOpen ? s.scrolled : ""}
        ${params.slug && isCatalogPage ? `${s.dark} ${s.planningPage}` : ""}
        `}
      >
        <Container className={s.container}>
          <div className={s.topBlock}>
            <Link href="/" className={s.logoLink} aria-label="Надрічний">
              <SiteLogo
                className={s.logoImg}
                mode="header"
                width={80}
                height={80}
                logoVariant={useForcedStaticLogo ? "static" : "auto"}
                inverted={useStaticLogo}
              />
            </Link>
            <nav>
              <ul className={s.navList}>
                {navLinks.map((item, idx) => {
                  return (
                    <li
                      className={`${pathname === item.link ? s.active : ""}`}
                      key={idx}
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className={s.bottomBlock}>
            <div className={s.numberAccordion}>
              {phoneIcon}{" "}
              {phones.length > 0 ? (
                <div className={s.number}>
                  <span>Контакти:</span>
                  {phones.map((phone, index) => {
                      if (index >=1) return
                      return (
                          <a key={`${phone}-${index}`} href={`tel:${phone.replace(/\s/g, "")}`}>
                              {phone}
                          </a>
                      )
                  })}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className={s.orderCallBtn}
              onClick={() => openModal("formB")}
            >
              Замовити дзвінок
            </button>
          </div>
          <div className={s.mobMenuBlock}>
            <button
              type="button"
              className={s.phoneBtn}
              aria-label="Замовити дзвінок"
              onClick={() => openModal("formB")}
            >
              {phoneIcon}
            </button>
            <button
              type="button"
              className={`${s.menuBtn} ${
                mobileMenuIsOpen ||
                ((isLightPage || isClientsPage) && !isScrolled)
                  ? s.white
                  : ""
              }`}
              aria-label={mobileMenuIsOpen ? "Закрити меню" : "Відкрити меню"}
              onClick={() => {
                if (mobileMenuIsOpen) {
                  closeMenu();
                } else if (!mobileMenuIsOpen) {
                  openMenu();
                }
              }}
            >
              {mobileMenuIsOpen ? closeIcon : menuBurger}
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu isOpen={mobileMenuIsOpen} />
    </>
  );
};

export default Header;

const phoneIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M15.9727 24C15.2009 23.9149 14.4402 23.758 13.7018 23.5315C12.2559 23.0611 10.9004 22.3769 9.68688 21.5052C7.91605 20.2464 6.30768 18.7999 4.89407 17.1949C3.55429 15.7355 2.40065 14.1358 1.45631 12.4279C0.73088 11.1269 0.263352 9.71433 0.0762179 8.25815C-0.0958091 7.09355 0.0242983 5.9076 0.4271 4.79374C0.829902 3.67988 1.50435 2.66858 2.39731 1.83962C2.9729 1.31828 3.58487 0.833103 4.22914 0.387254C4.52995 0.137799 4.91833 0 5.32069 0C5.72304 0 6.11142 0.137799 6.41223 0.387254C6.80647 0.665586 7.14969 1.00179 7.42851 1.3828C8.07077 2.20971 8.64134 3.08317 9.13482 3.99478C9.36742 4.41938 9.51621 4.87959 9.574 5.35342C9.61603 5.69735 9.56968 6.0457 9.43876 6.36956C9.30785 6.69342 9.0961 6.98351 8.82116 7.21577C8.36443 7.64955 7.86449 8.04174 7.32811 8.38704C6.84946 8.64508 6.49767 9.06739 6.34768 9.56403C6.19769 10.0607 6.26141 10.5923 6.52519 11.0458C6.92369 11.9891 7.48757 12.8639 8.19383 13.6343C9.1005 14.748 10.1356 15.7653 11.2803 16.6679C11.8613 17.1499 12.552 17.5022 13.3003 17.6986C13.6266 17.781 13.9708 17.7788 14.2958 17.6921C14.6208 17.6054 14.9143 17.4376 15.1447 17.2067C15.5713 16.7967 16.0104 16.4102 16.4746 16.0354C16.9269 15.6135 17.5201 15.349 18.1558 15.2858C18.685 15.273 19.2085 15.3901 19.674 15.6255C20.3576 15.97 20.9938 16.3909 21.5685 16.8787C22.2906 17.4104 22.9471 18.0153 23.5258 18.6825C23.6961 18.8523 23.8256 19.0539 23.906 19.274C23.9864 19.4942 24.0158 19.7278 23.992 19.9593C23.9683 20.1908 23.8921 20.415 23.7684 20.6169C23.6448 20.8188 23.4765 20.9939 23.2749 21.1304C22.5375 21.8229 21.7261 22.4429 20.8534 22.981C19.9007 23.5031 18.8402 23.8305 17.7418 23.9415H17.6289L15.9727 24Z" />
  </svg>
);

const menuBurger = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M4 19C3.71667 19 3.47934 18.904 3.288 18.712C3.09667 18.52 3.00067 18.2827 3 18C2.99934 17.7173 3.09534 17.48 3.288 17.288C3.48067 17.096 3.718 17 4 17H20C20.2833 17 20.521 17.096 20.713 17.288C20.905 17.48 21.0007 17.7173 21 18C20.9993 18.2827 20.9033 18.5203 20.712 18.713C20.5207 18.9057 20.2833 19.0013 20 19H4ZM4 14C3.71667 14 3.47934 13.904 3.288 13.712C3.09667 13.52 3.00067 13.2827 3 13C2.99934 12.7173 3.09534 12.48 3.288 12.288C3.48067 12.096 3.718 12 4 12H20C20.2833 12 20.521 12.096 20.713 12.288C20.905 12.48 21.0007 12.7173 21 13C20.9993 13.2827 20.9033 13.5203 20.712 13.713C20.5207 13.9057 20.2833 14.0013 20 14H4ZM4 9C3.71667 9 3.47934 8.904 3.288 8.712C3.09667 8.52 3.00067 8.28267 3 8C2.99934 7.71733 3.09534 7.48 3.288 7.288C3.48067 7.096 3.718 7 4 7H20C20.2833 7 20.521 7.096 20.713 7.288C20.905 7.48 21.0007 7.71733 21 8C20.9993 8.28267 20.9033 8.52033 20.712 8.713C20.5207 8.90567 20.2833 9.00133 20 9H4Z" />
  </svg>
);

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18 7L6 19M6 7L18 19"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
