import s from "./FooterContactItem.module.css";
import Image from "next/image";
import Link from "next/link";
type Props = {
  item: { title: string; icon: string; data: string[] };
};
const FooterContactItem = ({ item }: Props) => {
  const getLinkUrl = (item: string) => {
    if (item.includes("+38")) {
      return `tel:${item}`;
    }
    if (item.includes("@")) {
      return `mailto:${item}`;
    } else {
      return `https://g.co/kgs/7w4BSLH`;
    }
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
        {item.data.map((item, idx) => {
          return (
            <p className={s.listItem} key={idx}>
              <Link href={getLinkUrl(item)}>{item}</Link>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FooterContactItem;
