import s from "./ApartmentItem.module.css";
import { Apartment } from "@/Redux/apartmentSlice/slice";
import Image from "next/image";
import Link from "next/link";
const ApartmentItem = ({ item }: { item: Apartment }) => {
  console.log(item)
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
        </div>
      </div>
      <div className={s.bottomBlock}>
        <img
          className={s.layoutImg}
          src={`${item.guid.rendered}`}
          width={372}
          height={289}
          alt="floor-image"
        />
        <div>
          <Link href="#">
            Дізнатись вартість
            <Image src={"/icons/arrow.svg"} width={9} height={8} alt="arrow" />
          </Link>
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
        </div>
      </div>
    </li>
  );
};

export default ApartmentItem;
