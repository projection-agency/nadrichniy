import Container from "@/components/Container/Container";
import s from "./AdvantagesSection.module.css";
import Image from "next/image";
const AdvantagesSection = () => {
  return (
    <section className={s.section}>
      <Container className={s.container}>
        <h2>Переваги комплексу</h2>
        <div className={s.advantagesCont}>
          <div className={s.leftBlock}>
            <div className={`${s.item} ${s.white}`}>
              <Image
                src={"/icons/advantages1.svg"}
                width={92}
                height={92}
                alt="icon"
              />
              <h3 className={s.mobileAdvantage}>Місце для всіх поколінь</h3>
              <div className={s.content}>
                <h3 className={s.advantage}>Місце для всіх поколінь</h3>
                <p className={s.advantageDescr}>
                  Комплекс однаково зручний для родин з дітьми, людей поважного
                  віку та тих, хто працює вдома. Кожен почувається тут на своєму
                  місці
                </p>
              </div>
            </div>
            <div className={`${s.item} ${s.dark}`}>
              <Image
                src={"/icons/advantages2.svg"}
                width={92}
                height={92}
                alt="icon"
              />
              <h3 className={s.mobileAdvantage}>
                Свіже повітря та зелене оточення
              </h3>

              <div className={s.content}>
                <h3 className={s.advantage}>
                  Свіже повітря та зелене оточення
                </h3>
                <p className={s.advantageDescr}>
                  Житло поруч із природою, без необхідності залишати межі міста.
                  Чисте повітря та зелена зона навколо. Тут легко дихається і
                  завжди є де пройтись у тиші біля річки
                </p>
              </div>
            </div>
            <div className={`${s.item} ${s.dark}`}>
              <Image
                src={"/icons/advantages4.svg"}
                width={92}
                height={92}
                alt="icon"
              />
              <h3 className={s.mobileAdvantage}>Просто й логічно</h3>

              <div className={s.content}>
                <h3 className={s.advantage}>Просто й логічно</h3>
                <p className={s.advantageDescr}>
                  Із самого початку комплекс проєктувався як середовище для
                  життя, а не як набір будівель. Тут усе зроблено з розумом — і
                  на плані, і в реальності
                </p>
              </div>
              <Image
                className={s.background}
                src={"/images/advantages_bg2.jpg"}
                width={300}
                height={200}
                alt="bg"
              />
            </div>
          </div>

          <div className={s.rightBlock}>
            <div className={`${s.item} ${s.dark}`}>
              <Image
                src={"/icons/advantages3.svg"}
                width={92}
                height={92}
                alt="icon"
              />
              <h3 className={s.mobileAdvantage}>
                Захопливі краєвиди - тут видно вовчинецькі гори{" "}
              </h3>

              <div className={s.content}>
                <h3 className={s.advantage}>
                  Захопливі краєвиди - тут видно вовчинецькі гори{" "}
                </h3>
                <p className={s.advantageDescr}>
                  Панорамні вікна відкривають краєвиди на річку, вовчинецькі
                  гори та зелені простори навколо. Візуальна тиша, яка добре
                  впливає і на настрій, і на самопочуття
                </p>
              </div>
              <Image
                className={s.background}
                src={"/images/advantages_bg1.jpg"}
                width={300}
                height={200}
                alt="bg"
              />
            </div>
            <div className={`${s.item} ${s.white}`}>
              <Image
                src={"/icons/advantages5.svg"}
                width={92}
                height={92}
                alt="icon"
              />
              <h3 className={s.mobileAdvantage}>Все зроблено для життя</h3>

              <div className={s.content}>
                <h3 className={s.advantage}>Все зроблено для життя</h3>
                <p className={s.advantageDescr}>
                  Планування території продумане так, щоб важливі речі були під
                  рукою. Нічого зайвого, нічого складного — просто житло, в
                  якому комфортно жити щодня
                </p>
              </div>
            </div>
            <div className={`${s.item} ${s.white}`}>
              <Image
                src={"/icons/advantages6.svg"}
                width={92}
                height={92}
                alt="icon"
              />
              <h3 className={s.mobileAdvantage}>Якісна забудова</h3>
              <div className={s.content}>
                <h3 className={s.advantage}>Якісна забудова</h3>
                <p className={s.advantageDescr}>
                  Проєкт збудовано з дотриманням чітких будівельних принципів.
                  Ніяких компромісів у фундаменті чи оздобленні, лише рішення,
                  які витримують час
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdvantagesSection;
