import Image from "next/image";
import s from "./MapSectionSwiperItem.module.css";
const MapSectionSwiperItem = () => {
  return (
    <div className={s.item}>
      <Image
      className={s.itemImg}
        src={"/images/swiperImageMap.jpg"}
        width={820}
        height={780}
        alt="image"
      />
      <div className={s.content}>
        <div>
          <p className={s.itemSubtitle}>Для кого</p>
          <h3>Тут буде зручно</h3>
        </div>
        <div className={s.info}>
          <h4>
            <span></span>Для родин із дітьми
          </h4>
          <article>
            <p>
              Коли поруч садок, а школу не доводиться шукати далеко — це знімає
              зайві клопоти. Внутрішній двір без машин і з дитячим майданчиком —
              простір, де безпечно й спокійно
            </p>
            <p>
              Можна не поспішати, не шукати, не хвилюватися. Усе зроблено так,
              щоб щоденне життя з дитиною було трохи простішим — і вдома, і
              надворі
            </p>
          </article>
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
      </div>
    </div>
  );
};

export default MapSectionSwiperItem;
