"use client";
import s from "./ApartmentFilter.module.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import {
  setAreaFilter,
  toggleRoomType,
  toggleCorps,
  setPriceFilter,
  setYearFilter,
} from "@/Redux/apartmentSlice/slice";
import {
  selectArea,
  selectCorps,
  selectPrice,
  selectRoomTypes,
  selectYear,
} from "@/Redux/apartmentSlice/selectors";
import debounce from "@/utils/debounce";

const corpsNumbersArray = ["1", "2", "3", "4", "5", "6", "7"];
const SLIDER_DEBOUNCE_MS = 400;

const ApartmentFilter = ({
  totalCount = 0,
  isLoading = false,
}: {
  totalCount?: number;
  isLoading?: boolean;
}) => {
  const dispatch = useDispatch();
  const area = useSelector(selectArea);
  const roomTypes = useSelector(selectRoomTypes);
  const corps = useSelector(selectCorps);
  const price = useSelector(selectPrice);
  const yearsFilter = useSelector(selectYear);
  const date = new Date();
  const year = date.getFullYear();
  const [localArea, setLocalArea] = useState(area);
  const [localPrice, setLocalPrice] = useState(price);
  const [localYear, setLocalYear] = useState(yearsFilter);
  const pathname = usePathname();
  const isCatalogPage = pathname.includes("/catalog");

  const debouncedArea = useMemo(
    () =>
      debounce((e: number[]) => {
        dispatch(setAreaFilter([e[0], e[1]]));
      }, SLIDER_DEBOUNCE_MS),
    [dispatch]
  );

  const debouncedPrice = useMemo(
    () =>
      debounce((e: number[]) => {
        dispatch(setPriceFilter([e[0], e[1]]));
      }, SLIDER_DEBOUNCE_MS),
    [dispatch]
  );

  const debouncedYear = useMemo(
    () =>
      debounce((e: number[]) => {
        dispatch(setYearFilter([e[0], e[1]]));
      }, SLIDER_DEBOUNCE_MS),
    [dispatch]
  );

  return (
    <div className={s.filter}>
      <form
        action="#"
        className={`${s.form} ${isCatalogPage ? s.onCatalogPage : s.onHomePage}`}
      >
        <div className={`${s.filterGroup} ${s.roomFilter}`}>
          <span className={s.filterOption}>Кількість кімнат</span>
          <div className={s.options}>
            <label
              className={`${roomTypes.includes("one-room") ? s.selected : ""}`}
            >
              <input
                type="checkbox"
                name="rooms"
                value={1}
                onChange={() => dispatch(toggleRoomType("one-room"))}
              />
              1-кімнатні
            </label>
            <label
              className={`${roomTypes.includes("two-room") ? s.selected : ""}`}
            >
              <input
                type="checkbox"
                name="rooms"
                value={2}
                onChange={() => dispatch(toggleRoomType("two-room"))}
              />
              2-кімнатні
            </label>
            <label
              className={`${
                roomTypes.includes("three-room") ? s.selected : ""
              }`}
            >
              <input
                type="checkbox"
                name="rooms"
                value={3}
                onChange={() => dispatch(toggleRoomType("three-room"))}
              />
              3-кімнатні
            </label>
            <label
              className={`${
                roomTypes.includes("commercial-premises") ? s.selected : ""
              } ${s.commercial}`}
            >
              <input
                type="checkbox"
                name="rooms"
                value="commercial-premises"
                onChange={() => dispatch(toggleRoomType("commercial-premises"))}
              />
              Комерційні приміщення
            </label>
          </div>
        </div>

        <div className={`${s.filterGroup} ${s.houseFilter}`}>
          <span className={s.filterOption}>Корпус</span>
          <div className={s.options}>
            {corpsNumbersArray.map((num) => (
              <label
                className={`${corps.includes(num) ? s.selected : ""}`}
                key={num}
                htmlFor={`corps-${num}`}
              >
                <input
                  type="checkbox"
                  name="corps"
                  id={`corps-${num}`}
                  onChange={() => dispatch(toggleCorps(num))}
                />
                № {num}
              </label>
            ))}
          </div>
        </div>

        <div className={s.rowBreak} aria-hidden="true" />

        <div className={`${s.filterGroup} ${s.areaFilter}`}>
          <span className={s.filterOption}>Площа, м²</span>
          <div className="rangeCont">
            <div className={s.rangeValuesCont}>
              <p>
                <span className={s.min}>від</span>
                <span className={s.area}>{localArea[0]} м²</span>
              </p>
              <p>
                <span className={s.max}>до</span>{" "}
                <span className={s.area}>{localArea[1]} м²</span>
              </p>
            </div>
            <div className={s.range}>
              <RangeSlider
                defaultValue={[20, 250]}
                step={5}
                min={20}
                max={250}
                onInput={(e) => {
                  setLocalArea([e[0], e[1]]);
                  debouncedArea(e);
                }}
              />
            </div>
          </div>
        </div>

        <div className={`${s.filterGroup} ${s.priceFilter}`}>
          <span className={s.filterOption}>Вартість, м²</span>
          <div className="rangeCont">
            <div className={s.rangeValuesCont}>
              <p>
                <span className={s.min}>від</span>
                <span className={s.price}>{localPrice[0]}</span>
              </p>
              <p>
                <span className={s.max}>до</span>
                <span className={s.price}>{localPrice[1]}</span>
              </p>
            </div>
            <div className={s.range}>
              <RangeSlider
                defaultValue={[1000, 2000]}
                step={50}
                min={1000}
                max={2000}
                onInput={(e) => {
                  setLocalPrice([e[0], e[1]]);
                  debouncedPrice(e);
                }}
              />
            </div>
          </div>
        </div>

        <div className={`${s.filterGroup} ${s.scheduleFilter}`}>
          <span className={s.filterOption}>Термін здачі</span>
          <div className="rangeCont">
            <div className={s.rangeValuesCont}>
              <p>
                <span className={s.min}>з</span>
                <span className={s.price}>{localYear[0]}</span>
              </p>
              <p>
                <span className={s.max}>по</span>
                <span className={s.price}>{localYear[1]}</span>
              </p>
            </div>
            <div className={s.range}>
              <RangeSlider
                defaultValue={[year, 2029]}
                step={1}
                min={year}
                max={2029}
                onInput={(e) => {
                  setLocalYear(e);
                  debouncedYear(e);
                }}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className={s.catalogCta}
          disabled={!isLoading && totalCount === 0}
          onClick={() => {
            if (isLoading || totalCount === 0) return;
            document
              .getElementById("apartments-results")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span className={s.ctaLabel}>
            {!isLoading && totalCount === 0
              ? "Немає варіантів за фільтром"
              : `Дивитися ще ${totalCount} ${pluralVariants(totalCount)}`}
          </span>
          <span className={s.icon} aria-hidden="true">
            {!isLoading && totalCount === 0 ? null : isLoading ? (
              <span className={s.spinner} />
            ) : (
              arrow
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default ApartmentFilter;

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
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5H11M11 5L7 1M11 5L7 9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
