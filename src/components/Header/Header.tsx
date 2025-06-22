import s from "./Header.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <div className={s.topBlock}>
          <a href="">
            <Image
              alt="logo"
              src="/icons/main-logo.svg"
              width={200}
              height={46}
            />
          </a>
          <nav>
            <ul className={s.navList}>
              <li>
                <Link href={"#"}>Головна</Link>
              </li>
              <li>
                <Link href={"#"}>Про нас</Link>
              </li>
              <li>
                <Link href={"#"}>Каталог</Link>
              </li>
              <li>
                <Link href={"#"}>Новини</Link>
              </li>
              <li>
                <Link href={"#"}>Клієнтам</Link>
              </li>
              <li>
                <Link href={"#"}>Контакти</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={s.bottomBlock}>
          <div className={s.numberAccordion}>
            <Image
              alt="icon-call"
              height={24}
              width={24}
              src={"/icons/icon-phone.svg"}
            />
            <a href="" className={s.number}>
              <span>Контакти:</span>+38 (044) 333 85 98
            </a>
            <Image

              alt="icon-call"
              height={15}
              width={15}
              src={"/icons/accordion-arrow.svg"}
            />
          </div>
          <a className={s.orderCallBtn} href="">Замовити дзвінок</a>
        </div>
      </Container>
    </header>
  );
};

export default Header;
