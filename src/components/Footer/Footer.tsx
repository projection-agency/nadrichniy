import s from "./Footer.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import Link from "next/link";
import FooterContactItem from "../FooterContactItem/FooterContactItem";
const navLinks = [
  { title: "Головна", href: "/" },
  { title: "Каталог", href: "/catalog" },
  { title: "Блог", href: "/blog" },
  { title: "Клієнтам", href: "/clients" },
  { title: "Контакти", href: "/contacts" },
];

const contactsData = [
  {
    title: "Відділ продажу",
    icon: "/icons/footer-phone.svg",
    data: ["+38 (044) 333 85 98", "+38 (044) 333 85 98"],
  },
  {
    title: "Email:",
    icon: "/icons/footer-marker.svg",
    data: ["nadrichnyy@gmail.com"],
  },
  {
    title: "Адреса:",
    icon: "/icons/footer-mail.svg",
    data: ["Івано-Франківськ, вул. Надрічна, 12"],
  },
];
const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.mainContent}>
          <div className={s.leftBlock}>
            <a href="">
              <Image
                alt="logo"
                src="/icons/main-logo.svg"
                width={200}
                height={46}
              />
            </a>
            <Image
              className={s.bg}
              src={"/images/footer_bg.jpg"}
              width={820}
              height={596}
              alt="bg"
            />
            <h2>Житло біля річки, у районі, де легко дихати і просто жити</h2>
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
                return <FooterContactItem key={idx} item={item} />;
              })}
              <div className={s.socialsList}>
                <Link href={""}>
                  <Image
                    src={"/icons/telegram.svg"}
                    width={18}
                    height={18}
                    alt="telegram"
                  />
                </Link>
                <Link href={""}>
                  <Image
                    src={"/icons/facebook.svg"}
                    width={18}
                    height={18}
                    alt="facebook"
                  />
                </Link>
                <Link href={""}>
                  <Image
                    src={"/icons/instagram.svg"}
                    width={18}
                    height={18}
                    alt="instagram"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={s.privacyPolicyCont}>
          <p>2025© :ЖК Надрічний. Всі права захищені</p>
          <Link className={s.link} href={"#"}>
            Політика конфіденційності
          </Link>
          <p>
            Розробка сайту{" "}
            <Link className={s.link} href={"#"}>
              Before/After
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
