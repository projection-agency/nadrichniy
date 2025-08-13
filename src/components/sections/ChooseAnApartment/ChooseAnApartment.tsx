"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { API_URL } from "@/constants";
import { Apartment } from "@/Redux/apartmentSlice/slice";
import Container from "@/components/Container/Container";
import Image from "next/image";
import s from "./ChooseAnApartment.module.css";
import ApartmentFilter from "@/components/ApartmentFilter/ApartmentFilter";
import {
  selectArea,
  selectFloor,
  selectHouseNumbers,
  selectRoomTypes,
  selectYear,
} from "@/Redux/apartmentSlice/selectors";
import ApartmentItem from "@/components/ApartmentItem/ApartmentItem";
import { useModal } from "@/components/ModalContext";
import Link from "next/link";

const ChooseAnApartment = () => {
  const pathname = usePathname();
  const [apartmentData, setApartmentData] = useState([]);
  const [endSliceNumber, setEndSliceNumber] = useState(
    pathname.includes("/catalog") ? 9 : 3
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const selectedArea = useSelector(selectArea);
  const selectedFloor = useSelector(selectFloor);
  const selectedRoomTypes = useSelector(selectRoomTypes);
  const selectedHouses = useSelector(selectHouseNumbers);
  const selectDelivery = useSelector(selectYear);
  const { openModal } = useModal();

  useEffect(() => {
    const selectedDeliveryParams = `delivery_min=${selectDelivery[0]}-01-01&delivery_max=${selectDelivery[1]}-12-31`;
    const selectedHouseParams = `${
      selectedHouses.length !== 0
        ? `house_number=${selectedHouses.join(",")}`
        : ""
    }`;

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
          `${API_URL}/wp-json/wp/v2/apartments?${selectedRoomParams}&${selectedFloorParams}&${selectedAreaParams}&${selectedHouseParams}${selectedDeliveryParams}`
        );
        const data = await response.json();
        setApartmentData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApartments();
  }, [
    selectedRoomTypes,
    selectedFloor,
    selectedArea,
    selectedHouses,
    selectDelivery,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return window.removeEventListener("resize", () => {});
  }, []);

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
          <button onClick={() => openModal("formA")}>Відкрити фільтр</button>
        </div>
        {windowWidth >= 1024 ? <ApartmentFilter /> : ""}
        <ul className={`${s.apartmentsList} `}>
          {apartmentData.slice(0, endSliceNumber).map((item: Apartment) => {
            return <ApartmentItem item={item} key={item.id} />;
          })}
        </ul>
        {windowWidth <= 1024 ? (
          <Link href={"/catalog"} className={s.paginationBtn}>
            Дивитися ще {arrow}
          </Link>
        ) : (
          ""
        )}
      </Container>
    </section>
  );
};

export default ChooseAnApartment;

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
