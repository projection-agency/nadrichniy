"use client";
import s from "./ApartmentItem.module.css";
import { Apartment } from "@/Redux/apartmentSlice/slice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const ApartmentItem = ({ item }: { item: Apartment }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <li className={s.item}>
      <div className={s.topBlock}>
        <ul className={s.apartmentInfo}>
          <li>{item.Area} м²</li>
          <li>{item.apartments_category[0].name}</li>
          <li>{item.Corps} корпус</li>
          <li>{item.Flour} поверх</li>
        </ul>
        <div>
          <p>Запланована здача</p>
          {item.Schedule}
          {window.innerWidth <= 1024 ? (
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
              ) : (
                ""
              )}
              {item.Isoselya == "1" ? (
                <li>
                  <Image
                    src={"/icons/advantage2.svg"}
                    width={38}
                    height={38}
                    alt="icon"
                  />
                </li>
              ) : (
                ""
              )}
              {item.Discount == "1" ? (
                <li>
                  <Image
                    src={"/icons/advantage3.svg"}
                    width={38}
                    height={38}
                    alt="icon"
                  />
                </li>
              ) : (
                ""
              )}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={s.bottomBlock}>
        <Image
          className={s.layoutImg}
          src={`${item.Flour_layout}`}
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
          {window.innerWidth >= 1024 ? (
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
              ) : (
                ""
              )}
              {item.Isoselya == "1" ? (
                <li>
                  <Image
                    src={"/icons/advantage2.svg"}
                    width={38}
                    height={38}
                    alt="icon"
                  />
                </li>
              ) : (
                ""
              )}
              {item.Discount == "1" ? (
                <li>
                  <Image
                    src={"/icons/advantage3.svg"}
                    width={38}
                    height={38}
                    alt="icon"
                  />
                </li>
              ) : (
                ""
              )}
            </ul>
          ) : (
            ""
          )}
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
