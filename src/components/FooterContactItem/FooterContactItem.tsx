import s from "./FooterContactItem.module.css";
import Image from "next/image";
type Props = {
  item: { title: string; icon: string; data: string[] };
};
const FooterContactItem = ({ item }: Props) => {
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
          return <p className={s.listItem} key={idx}>{item}</p>;
        })}
      </div>
    </div>
  );
};

export default FooterContactItem;
