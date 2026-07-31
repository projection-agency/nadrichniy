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
  // selectFloor,
  // selectHouseNumbers,
  selectCorps,
  selectRoomTypes,
  selectYear,
} from "@/Redux/apartmentSlice/selectors";
import ApartmentItem from "@/components/ApartmentItem/ApartmentItem";
import { useModal } from "@/components/ModalContext";
import Link from "next/link";
import { useWindowWidth } from "@/utils/useWindowWidth";

const INITIAL_HOME = 3;
const INITIAL_CATALOG = 9;
const LOAD_MORE_STEP = 6;

const ChooseAnApartment = () => {
  const pathname = usePathname();
  const isCatalogPage = pathname.includes("/catalog");
  const [apartmentData, setApartmentData] = useState<Apartment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnyApartments, setHasAnyApartments] = useState<boolean | null>(
    null
  );
  const [endSliceNumber, setEndSliceNumber] = useState(
    isCatalogPage ? INITIAL_CATALOG : INITIAL_HOME
  );
  const windowWidth = useWindowWidth();
  const selectedArea = useSelector(selectArea);
  const selectedRoomTypes = useSelector(selectRoomTypes);
  const selectedCorps = useSelector(selectCorps);
  const selectDelivery = useSelector(selectYear);
  const { openModal } = useModal();

  const visibleCount = Math.min(endSliceNumber, apartmentData.length);
  const remainingCount = Math.max(0, totalCount - visibleCount);
  const canLoadMore = isCatalogPage && remainingCount > 0;

  useEffect(() => {
    let cancelled = false;

    const checkApartmentsExist = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wp-json/wp/v2/apartments?per_page=1`
        );
        const total = Number(response.headers.get("X-WP-Total") || "0");
        const data = await response.json();

        if (cancelled) return;

        setHasAnyApartments(
          total > 0 || (Array.isArray(data) && data.length > 0)
        );
      } catch (error) {
        console.log(error);
        if (!cancelled) {
          setHasAnyApartments(false);
        }
      }
    };

    checkApartmentsExist();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const selectedDeliveryParams = `delivery_min=${selectDelivery[0]}-01-01&delivery_max=${selectDelivery[1]}-12-31`;

    const selectedCorpsParams =
      selectedCorps.length !== 0 ? `corps=${selectedCorps.join(",")}` : "";

    const selectedRoomParams = `${
      selectedRoomTypes.length !== 0
        ? `apartments_category=${selectedRoomTypes.join(",")}`
        : ""
    }`;

    const selectedAreaParams = `area_min=${selectedArea[0]}&area_max=${selectedArea[1]}`;

    const controller = new AbortController();
    let cancelled = false;
    setIsLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const params = [
          selectedRoomParams,
          selectedAreaParams,
          selectedCorpsParams,
          selectedDeliveryParams,
          "per_page=100",
        ]
          .filter(Boolean)
          .join("&");

        const response = await fetch(
          `${API_URL}/wp-json/wp/v2/apartments?${params}`,
          { signal: controller.signal }
        );
        if (cancelled) return;

        const data = await response.json();
        if (cancelled) return;

        const total = Number(response.headers.get("X-WP-Total") || "0");
        const list = Array.isArray(data) ? data : [];
        setApartmentData(list);
        setTotalCount(total > 0 ? total : list.length);
        setEndSliceNumber(isCatalogPage ? INITIAL_CATALOG : INITIAL_HOME);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.log(error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [
    selectedRoomTypes,
    selectedArea,
    selectedCorps,
    selectDelivery,
    isCatalogPage,
  ]);

  const handleLoadMore = () => {
    setEndSliceNumber((prev) => prev + LOAD_MORE_STEP);
  };

  if (hasAnyApartments !== true) {
    return null;
  }

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
        {windowWidth >= 1024 ? (
          <ApartmentFilter totalCount={totalCount} isLoading={isLoading} />
        ) : (
          ""
        )}
        <ul id="apartments-results" className={s.apartmentsList}>
          {isLoading && apartmentData.length === 0 ? (
            <li className={s.emptyResults}>Шукаємо приміщення…</li>
          ) : apartmentData.length === 0 ? (
            <li className={s.emptyResults}>
              За обраними фільтрами приміщень немає
            </li>
          ) : (
            apartmentData.slice(0, endSliceNumber).map((item: Apartment) => {
              return <ApartmentItem item={item} key={item.id} />;
            })
          )}
        </ul>

        {canLoadMore ? (
          <button
            type="button"
            className={s.loadMoreBtn}
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            Завантажити ще
            <span className={s.loadMoreIcon} aria-hidden="true">
              {arrowDown}
            </span>
          </button>
        ) : null}

        {windowWidth <= 1024 && !isCatalogPage ? (
          !isLoading && totalCount === 0 ? (
            <button type="button" className={s.paginationBtn} disabled>
              Немає варіантів за фільтром
            </button>
          ) : (
            <Link href="/catalog" className={s.paginationBtn}>
              Дивитися ще {totalCount} {pluralVariants(totalCount)} {arrow}
            </Link>
          )
        ) : null}
      </Container>
    </section>
  );
};

export default ChooseAnApartment;

function pluralVariants(n: number): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return "варіантів";
  if (last === 1) return "варіант";
  if (last >= 2 && last <= 4) return "варіанти";
  return "варіантів";
}

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

const arrowDown = (
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
