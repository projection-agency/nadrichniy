"use client";
import s from "./PlanningSection.module.css";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container/Container";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/constants";
import { Apartment } from "@/Redux/apartmentSlice/slice";
import ApartmentItem from "@/components/ApartmentItem/ApartmentItem";

const PlanningSection = () => {
  const [active, setActive] = useState<"flat" | "floor">("flat");
  const [apartmentData, setApartmentData] = useState([]);

  const router = useRouter();
  const [item, setItem] = useState<Apartment>();
  const { slug } = useParams();

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wp-json/wp/v2/apartments?slug=${slug}`
        );
        const data = await response.json();
        setItem(data[0]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApartment();
  }, [slug]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(`${API_URL}/wp-json/wp/v2/apartments`);
        const data = await response.json();
        setApartmentData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApartments();
  }, []);
  return (
    <section className={s.section}>
      <Container>
        {item ? (
          <div className={s.apartment}>
            <div className={s.apartmentInfo}>
              <Link
                href={"#"}
                onClick={() => router.back()}
                className={s.backLink}
              >
                {arrow}
                Назад
              </Link>
              <div className={s.topInfo}>
                <div className={s.planningInfo}>
                  <p className={s.rooms}>{item.apartments_category[0].name}</p>
                  <p className={s.area}>{item.Area} м²</p>
                </div>
                <p className={s.delivery}>черга {item.Scheduled_delivery}</p>
              </div>
              <div className={s.bottomInfo}>
                <p className={s.houseNumber}>
                  Будинок №{item.house_number[0].name}
                </p>
                <p className={s.floor}>Поверх {item.Flour}</p>
                <ul className={s.advantages}>
                  {item.Postponement == "1" ? (
                    <li>
                      <Image
                        src={"/icons/advantage1.svg"}
                        width={38}
                        height={38}
                        alt="icon"
                      />
                      Розтермінування
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
                      єОселя
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
                      Знижка при повній оплаті
                    </li>
                  ) : (
                    ""
                  )}
                </ul>

                <div className={s.buttons}>
                  <button className={s.secondary}>Дізнатися ціну</button>
                  <button className={s.primary}>Забронювати</button>
                </div>
              </div>
            </div>
            
            <div className={s.apartmentPlanning}>
              <div className={s.topBlock}>
                <div className={s.planningToggler}>
                  <div
                    className={s.background}
                    style={{
                      transform:
                        active === "flat"
                          ? "translateX(0%)"
                          : "translateX(100%)",
                    }}
                  ></div>
                  <button
                    className={active === "flat" ? s.active : ""}
                    onClick={() => setActive("flat")}
                  >
                    Квартира
                  </button>
                  <button
                    className={active === "floor" ? s.active : ""}
                    onClick={() => setActive("floor")}
                  >
                    Поверх
                  </button>
                </div>

                <ul className={s.links}>
                  <li>{share}</li>
                  <li>{download}</li>
                </ul>
              </div>
              {active === "flat" ? (
                <Image
                  className={s.layoutImg}
                  src={`/images/bg_about.jpg`}
                  width={372}
                  height={289}
                  alt="room-image"
                />
              ) : (
                <Image
                  className={s.layoutImg}
                  src={`${item.Flour_layout}`}
                  width={372}
                  height={289}
                  alt="floor-image"
                />
              )}
            </div>
          </div>
        ) : (
          <p>please wait</p>
        )}
        <h2>Схожі планування</h2>
        {apartmentData ? (
          <ul className={`${s.apartmentsList}`}>
            {apartmentData.slice(0, 3).map((item: Apartment) => {
              return <ApartmentItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          <p>please wait</p>
        )}
      </Container>
    </section>
  );
};

export default PlanningSection;

const share = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" />
  </svg>
);

const download = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M12 16.4687C11.8333 16.4687 11.6771 16.4429 11.5312 16.3912C11.3854 16.3396 11.25 16.2508 11.125 16.125L6.625 11.625C6.375 11.375 6.255 11.0833 6.265 10.75C6.275 10.4167 6.395 10.125 6.625 9.875C6.875 9.625 7.17208 9.495 7.51625 9.485C7.86041 9.475 8.15708 9.59458 8.40624 9.84375L10.75 12.1875V3.25C10.75 2.89584 10.87 2.59917 11.11 2.36C11.35 2.12084 11.6467 2.00084 12 2C12.3533 1.99917 12.6504 2.11917 12.8912 2.36C13.1321 2.60084 13.2517 2.8975 13.25 3.25V12.1875L15.5937 9.84375C15.8437 9.59375 16.1408 9.47375 16.485 9.48375C16.8292 9.49375 17.1258 9.62417 17.375 9.875C17.6042 10.125 17.7242 10.4167 17.735 10.75C17.7458 11.0833 17.6258 11.375 17.375 11.625L12.875 16.125C12.75 16.25 12.6146 16.3387 12.4687 16.3912C12.3229 16.4437 12.1667 16.4696 12 16.4687ZM4.5 22C3.8125 22 3.22417 21.7554 2.735 21.2662C2.24583 20.7771 2.00083 20.1883 2 19.5V17C2 16.6458 2.12 16.3492 2.36 16.11C2.6 15.8708 2.89667 15.7508 3.25 15.75C3.60333 15.7492 3.90041 15.8692 4.14125 16.11C4.38208 16.3508 4.50166 16.6475 4.5 17V19.5H19.5V17C19.5 16.6458 19.62 16.3492 19.86 16.11C20.1 15.8708 20.3967 15.7508 20.75 15.75C21.1033 15.7492 21.4004 15.8692 21.6412 16.11C21.8821 16.3508 22.0016 16.6475 22 17V19.5C22 20.1875 21.7554 20.7762 21.2662 21.2662C20.7771 21.7562 20.1883 22.0008 19.5 22H4.5Z" />
  </svg>
);

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
