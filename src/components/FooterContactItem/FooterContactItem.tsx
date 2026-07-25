import s from "./FooterContactItem.module.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: { title: string; icon: string; data: string[] };
  mapsPlaceUrl?: string;
};

const FooterContactItem = ({ item, mapsPlaceUrl = "#" }: Props) => {
  const getLinkUrl = (value: string) => {
    if (value.includes("+") || value.startsWith("0")) {
      return `tel:${value.replace(/\s/g, "")}`;
    }
    if (value.includes("@")) {
      return `mailto:${value}`;
    }
    return mapsPlaceUrl;
  };

  return (
    <div className={s.item}>
      <h3 className={s.title}>
        <span className={s.itemIcon}>
          <Image width={16} height={16} alt="icon" src={item.icon} />
        </span>
        {item.title}
      </h3>
      <div className={s.itemDataList}>
        {item.data.map((value, idx) => {
          return (
            <p className={s.listItem} key={idx}>
              <Link href={getLinkUrl(value)}>{value}</Link>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FooterContactItem;
