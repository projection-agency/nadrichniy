"use client";
import { useEffect, useState } from "react";
import s from "./StatisticsList.module.css";
import { API_URL } from "@/constants";
import StatisticsListItem from "../StatisticsListItem/StatisticsListItem";

export type StatsItem = {
  id: number;
  Numbers: string;
  title: {
    rendered: string;
  };
};
const StatisticsList = () => {
  const [listData, setListData] = useState<StatsItem[]>([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/wp-json/wp/v2/number`);
        const data = await response.json();
        setListData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  return (
    <ul className={s.list}>
      {listData?.map((item: StatsItem) => {
        return <StatisticsListItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default StatisticsList;
