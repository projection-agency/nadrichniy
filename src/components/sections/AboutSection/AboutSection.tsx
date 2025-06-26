import Container from "@/components/Container/Container";
import Image from "next/image";
import s from "./AboutSection.module.css";

const AboutSection = () => {
  return (
    <section className={s.section}>
      <Container>
        <ul className={s.list}>
          <li>
            <div className={s.titleCont}>
              <h2>Про нас</h2>
            </div>
            <div className={s.qoute}>
              <h3>Нас знають, з нами працюють, нам довіряють </h3>
              <p>© Спілка забудовників</p>
            </div>
            <Image
              className={s.bg}
              src={"/images/bg_about.jpg"}
              width={300}
              height={300}
              alt="image"
            />
          </li>

          <li>
            <p className={s.experience}>
              Понад 20 років у Івано‑Франківську зводимо{" "}
              <span>
                <Image
                  width={32}
                  height={32}
                  src={"/icons/about1.svg"}
                  alt="icon"
                />
              </span>{" "}
              житло, куди хочеться повертатися, а також соціальні{" "}
              <span>
                <Image
                  width={32}
                  height={32}
                  src={"/icons/about2.svg"}
                  alt="icon"
                />
              </span>{" "}
              <br />й інфраструктурні об’єкти
            </p>
            <div className={s.statistics}>
              <div>
                <h3>95%</h3>
                <p>Проєктів здано без затримок</p>
              </div>
              <div>
                <h3>20+</h3>
                <p>Років будівельного досвіду</p>
              </div>
              <div>
                <h3>7500+</h3>
                <p>Квартир введено в експлуатацію</p>
              </div>
            </div>
          </li>

          <li>
            <p className={s.cardTitle}>
              <span>Ми про комфорт, а не про ефекти</span> — тільки спокійна
              архітектура, що створює затишок
            </p>
            <div className={s.content}>
              <p>
                Комплекс виглядає спокійно й доречно, без спроб виділитися
                формою чи кольором. Форми зрозумілі, фасади лаконічні, між
                будинками достатньо простору та світла
              </p>

              <button>
                Замовити дзвінок
                <span>
                  <Image
                    className={s.linkIcon}
                    alt="icon-apartment"
                    width={24}
                    height={24}
                    src={"/icons/icon-apartment.svg"}
                  />
                </span>
              </button>
            </div>
          </li>

          <li>
            <Image
              src={"/images/bg_about1.jpg"}
              width={820}
              height={780}
              alt="image"
            />
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default AboutSection;
