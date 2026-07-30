"use client";
import s from "./ApartmentItem.module.css";
import { Apartment } from "@/Redux/apartmentSlice/slice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWindowWidth } from "@/utils/getWindowWidth";
import { resolveMediaUrl } from "@/utils/resolveMediaUrl";

const ApartmentItem = ({ item }: { item: Apartment }) => {
  const pathname = usePathname();
  const windowWidth = getWindowWidth();
  const layoutSrc = resolveMediaUrl(item.Flour_layout);
  const hasAdvantages =
    item.Postponement == "1" || item.Isoselya == "1" || item.Discount == "1";

  const advantagesList = hasAdvantages ? (
    <ul className={s.advantages}>
      {item.Postponement == "1" ? (
        <li>
          <Image
            src={"/icons/advantage1.svg"}
            width={38}
            height={38}
            alt="icon"
          />
        </li>
      ) : null}
      {item.Isoselya == "1" ? (
        <li>
          <Image
            src={"/icons/advantage2.svg"}
            width={38}
            height={38}
            alt="icon"
          />
        </li>
      ) : null}
      {item.Discount == "1" ? (
        <li>
          <Image
            src={"/icons/advantage3.svg"}
            width={38}
            height={38}
            alt="icon"
          />
        </li>
      ) : null}
    </ul>
  ) : null;

  return (
    <li className={s.item}>
      <div className={s.topBlock}>
        <ul className={s.apartmentInfo}>
          <li>{item.Area} м²</li>
          <li>{item.apartments_category[0].name}</li>
          <li>{item.Corps ? `${item.Corps} корпус` : "—"}</li>
          {item.Flour ? <li>{item.Flour} поверх</li> : null}
        </ul>
        <div>
          <p>Запланована здача</p>
          {item.Schedule}
          {windowWidth <= 1024 ? advantagesList : null}
        </div>
      </div>
      <div className={s.bottomBlock}>
        <Image
          className={s.layoutImg}
          src={layoutSrc}
          width={372}
          height={289}
          alt="floor-image"
        />
        <div>
          <Link
            href={`${
              pathname === "/catalog" || pathname === "/"
                ? `catalog/${item.slug}`
                : item.slug
            }`}
          >
            Дізнатись вартість
            {arrow}
          </Link>
          {windowWidth >= 1024 ? advantagesList : null}
        </div>
      </div>
    </li>
  );
};

export default ApartmentItem;

const arrow = (
  <svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4.5H9M9 4.5L4.76471 0.5M9 4.5L4.76471 8.5" />
  </svg>
);
