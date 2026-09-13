"use client";
import s from "./Footer.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import Link from "next/link";
import FooterContactItem from "../FooterContactItem/FooterContactItem";
import SiteLogo from "../SiteLogo/SiteLogo";
import { useThemeSettings } from "@/lib/useThemeSettings";
import {
  buildContactsList,
  getMapsPlaceUrl,
  getSocialLinks,
} from "@/lib/themeSettings";
import { useMemo } from "react";
import { useWindowWidth } from "@/utils/useWindowWidth";
import { FooterIcon } from "./footerIcon";

const navLinks = [
  { title: "Головна", href: "/" },
  { title: "Каталог", href: "/catalog" },
  { title: "Блог", href: "/blog" },
  { title: "Клієнтам", href: "/clients" },
  { title: "Контакти", href: "/contacts" },
];

const SOCIAL_FALLBACK_ICONS: Record<string, string> = {
  telegram: "/icons/telegram.svg",
  facebook: "/icons/facebook.svg",
  instagram: "/icons/instagram.svg",
};

const DEFAULT_TAGLINE_DESKTOP =
  "Житло біля річки, у районі, де легко дихати і просто жити";

const DEFAULT_TAGLINE_MOBILE = (
  <>
    Житло біля річки,
    <br />
    у районі, де легко дихати і
    <br />
    просто жити
  </>
);

const Footer = () => {
  const { settings } = useThemeSettings();
  const isMobile = useWindowWidth() <= 1024;
  const contactsData = useMemo(() => buildContactsList(settings), [settings]);
  const mapsPlaceUrl = useMemo(() => getMapsPlaceUrl(settings), [settings]);
  const socials = useMemo(() => getSocialLinks(settings), [settings]);
  const customTagline = settings.footer_tagline?.trim();
  const tagline =
    customTagline ||
    (isMobile ? DEFAULT_TAGLINE_MOBILE : DEFAULT_TAGLINE_DESKTOP);

  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.mainContent}>
          <div className={s.leftBlock}>
            <Link href="/" className={s.logoLink} aria-label="Надрічний">
              <SiteLogo
                mode="footer"
                className={s.logoImg}
                skeletonClassName={s.logoSkeleton}
                width={100}
                height={100}
              />
            </Link>
            <span
              className={s.bg}
              aria-hidden
              dangerouslySetInnerHTML={{ __html: FooterIcon }}
            />
            <h2>{tagline}</h2>
          </div>
          <div className={s.rightBlock}>
            <nav>
              <ul className={s.navigationList}>
                {navLinks.map((item, idx) => {
                  return (
                    <li className={s.navigationItem} key={idx}>
                      <Link href={`${item.href}`}>{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className={s.contacts}>
              {contactsData.map((item, idx) => {
                return (
                  <FooterContactItem
                    key={idx}
                    item={item}
                    mapsPlaceUrl={mapsPlaceUrl}
                  />
                );
              })}
              <div className={s.socialsList}>
                {socials.length > 0
                  ? socials.map((item, idx) => {
                      const name = (item.hl_input_text_name || "").toLowerCase();
                      const fallbackIcon =
                        SOCIAL_FALLBACK_ICONS[name] || "/icons/telegram.svg";
                      const href = item.hl_input_text_link || "#";
                      return (
                        <Link href={href} key={idx} target="_blank" rel="noreferrer">
                          {item.hl_img_svg_icon ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.hl_img_svg_icon,
                              }}
                            />
                          ) : (
                            <Image
                              src={fallbackIcon}
                              width={18}
                              height={18}
                              alt={item.hl_input_text_name || "social"}
                            />
                          )}
                        </Link>
                      );
                    })
                  : Object.entries(SOCIAL_FALLBACK_ICONS).map(([name, icon]) => (
                      <Link href={"#"} key={name}>
                        <Image src={icon} width={18} height={18} alt={name} />
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <div className={s.privacyPolicyCont}>
          <p>2026© Житловий масив Надрічний. Всі права захищені</p>
          <Link className={s.link} href={"/privacy-policy"}>
            Політика конфіденційності
          </Link>
          <p>
            Дизайн{" "}
            <Link
              className={s.link}
              href="https://projection-ua.webflow.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Before/After
            </Link>
            , Верстка{" "}
            <Link
              className={s.link}
              href="https://projection-ua.webflow.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PROJECTION
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
