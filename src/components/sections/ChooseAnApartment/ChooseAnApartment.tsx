"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import Image from "next/image";
import s from "./ChooseAnApartment.module.css";
import { API_URL } from "@/constants";
import ApartmentFilter from "@/components/ApartmentFilter/ApartmentFilter";
import { useSelector } from "react-redux";
import {
  selectArea,
  selectFloor,
  selectRoomTypes,
} from "@/Redux/apartmentSlice/selectors";
import ApartmentItem from "@/components/ApartmentItem/ApartmentItem";
import { Apartment } from "@/Redux/apartmentSlice/slice";
const ChooseAnApartment = () => {
  const [apartmentData, setApartmentData] = useState([]);
  const selectedArea = useSelector(selectArea);
  const selectedFloor = useSelector(selectFloor);
  const selectedRoomTypes = useSelector(selectRoomTypes);

  useEffect(() => {
    const selectedRoomParams = `${
      selectedRoomTypes.length !== 0
        ? `apartments_category=${selectedRoomTypes.join(",")}`
        : ""
    }`;

    const selectedFloorParams = `floor_min=${selectedFloor[0]}&floor_max=${selectedFloor[1]}`;
    const selectedAreaParams = `area_min=${selectedArea[0]}&area_max=${selectedArea[1]}`;

    const fetchApartments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wp-json/wp/v2/apartments?${selectedRoomParams}&${selectedFloorParams}&${selectedAreaParams}`
        );
        const data = await response.json();
        setApartmentData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApartments();
  }, [selectedRoomTypes, selectedFloor, selectedArea]);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.sectionHead}>
          <h2>Обрати квартиру</h2>
          <ul className={s.advantages}>
            <li>
              <Image
                src={"/icons/advantage1.svg"}
                width={38}
                height={38}
                alt="icon"
              />
              Розтермінування
            </li>
            <li>
              <Image
                src={"/icons/advantage2.svg"}
                width={38}
                height={38}
                alt="icon"
              />
              єОселя
            </li>
            <li>
              <Image
                src={"/icons/advantage3.svg"}
                width={38}
                height={38}
                alt="icon"
              />
              Знижка при повній оплаті
            </li>
          </ul>
        </div>
        <ApartmentFilter></ApartmentFilter>
        <ul className={s.apartmentsList}>
          {apartmentData.slice(0, 3).map((item: Apartment) => {
            return <ApartmentItem item={item} key={item.id} />;
          })}
        </ul>
      </Container>
    </section>
  );
};

export default ChooseAnApartment;
