import s from "./StatisticsListItem.module.css";
import { StatsItem } from "../StatisticsList/StatisticsList";

const StatisticsListItem = ({ item }: { item: StatsItem }) => {
  return (
    <li className={s.item}>
      {item.Icon ? (
        <span
          className={s.icon}
          dangerouslySetInnerHTML={{ __html: item.Icon }}
        />
      ) : null}
      <p>{item.Numbers}</p>
      <h3>{item.Text || item.title?.rendered}</h3>
    </li>
  );
};

export default StatisticsListItem;
