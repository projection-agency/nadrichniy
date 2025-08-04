"use client";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import s from "./ApartmentFilterPopup.module.css";
import {
  setAreaFilter,
  setFloorFilter,
  toggleRoomType,
  toggleHouseNumber,
  setPriceFilter,
  setYearFilter,
} from "@/Redux/apartmentSlice/slice";
import { useSelector } from "react-redux";
import {
  selectArea,
  selectFloor,
  selectHouseNumbers,
  selectRoomTypes,
  selectYear,
} from "@/Redux/apartmentSlice/selectors";
import debounce from "@/utils/debounce";
import { closeIco } from "../ModalContext";
import { initialState } from "@/Redux/apartmentSlice/slice";
const houseNumbersArray = [
  { number: "one" },
  { number: "two" },
  { number: "three" },
  { number: "four" },
  { number: "five" },
];

export default function ApartmentFilterPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const area = useSelector(selectArea);
  const floor = useSelector(selectFloor);
  const roomTypes = useSelector(selectRoomTypes);
  const houseNumbers = useSelector(selectHouseNumbers);
  const yearsFilter = useSelector(selectYear);
  const date = new Date();
  const year = date.getFullYear();
  const [localArea, setLocalArea] = useState(area);
  const [localFloor, setLocalFloor] = useState(floor);
  const [localYear, setLocalYear] = useState(yearsFilter);
  const pathname = usePathname();
  const isInitialFilter =
    area === initialState.filters.area &&
    roomTypes === initialState.filters.selectedTypes &&
    floor === initialState.filters.floor &&
    houseNumbers === initialState.filters.house &&
    yearsFilter === initialState.filters.year;

  console.log(isInitialFilter);

  const handleChangeArea = (e: number[]) => {
    dispatch(setAreaFilter([e[0], e[1]]));
  };

  const handleChangeFloor = (e: number[]) => {
    dispatch(setFloorFilter([e[0], e[1]]));
  };

  const handleChangeYear = (e: number[]) => {
    dispatch(setYearFilter([e[0], e[1]]));
  };

  const debouncedArea = debounce(handleChangeArea, 1000);
  const debouncedFloor = debounce(handleChangeFloor, 1000);
  const debouncedYear = debounce(handleChangeYear, 1000);

  return (
    <div className={s.filter}>
      <button onClick={() => onClose()} className={s.closeBtn}>
        {closeIco}
      </button>
      <form
        action="#"
        className={`${s.form} ${
          pathname.includes("/catalog") ? s.onCatalogPage : ""
        }`}
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
              }`}
            >
              <input
                type="checkbox"
                name="rooms"
                value="commercial-premises"
                onChange={() => dispatch(toggleRoomType("commercial-premises"))}
              />
              Комерція
            </label>
          </div>
        </div>

        {pathname.includes("/catalog") ? (
          <div className={`${s.filterGroup} ${s.houseFilter}`}>
            <span className={s.filterOption}>Будинок</span>
            <div className={s.options}>
              {houseNumbersArray.map((item: { number: string }, idx) => {
                return (
                  <label
                    className={`${
                      houseNumbers.includes(`house-${item.number}`)
                        ? s.selected
                        : ""
                    }`}
                    key={idx}
                    htmlFor={`${item.number}`}
                  >
                    <input
                      type="checkbox"
                      name="houseNumber"
                      id={`${item.number}`}
                      onChange={() =>
                        dispatch(toggleHouseNumber(`house-${item.number}`))
                      }
                    />
                    № {idx + 1}
                  </label>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={`${s.filterGroup}`}>
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

        <div className={s.filterGroup}>
          <span className={s.filterOption}>Поверх</span>
          <div className="rangeCont">
            <div className={s.rangeValuesCont}>
              <p>
                <span className={s.min}>від</span>
                <span className={s.floor}>{localFloor[0]}</span>
              </p>
              <p>
                <span className={s.max}>до</span>
                <span className={s.floor}>{localFloor[1]}</span>
              </p>
            </div>
            <div className={s.range}>
              <RangeSlider
                defaultValue={[1, 9]}
                step={1}
                min={1}
                max={9}
                onInput={(e) => {
                  setLocalFloor([e[0], e[1]]);
                  debouncedFloor(e);
                }}
              />
            </div>
          </div>
        </div>

        {pathname.includes("/catalog") ? (
          <div className={`${s.filterGroup}`}>
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
                  defaultValue={[year, 2027]}
                  step={1}
                  min={year}
                  max={2027}
                  onInput={(e) => {
                    setLocalYear(e);
                    debouncedYear(e);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
      <button onClick={() => onClose()} className={s.falseSubmitBtn}>
        {isInitialFilter ? "Застосувати" : "Скинути"}
      </button>
    </div>
  );
}
