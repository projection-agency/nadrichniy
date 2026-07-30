"use client";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import s from "./ApartmentFilterPopup.module.css";
import {
  setAreaFilter,
  toggleRoomType,
  toggleCorps,
  setYearFilter,
  resetFilters,
} from "@/Redux/apartmentSlice/slice";
import { useSelector } from "react-redux";
import {
  selectArea,
  selectCorps,
  selectRoomTypes,
  selectYear,
} from "@/Redux/apartmentSlice/selectors";
import debounce from "@/utils/debounce";
import { closeIco } from "../ModalContext";
import { initialState } from "@/Redux/apartmentSlice/slice";

const corpsNumbersArray = ["1", "2", "3", "4", "5", "6", "7"];
const SLIDER_DEBOUNCE_MS = 400;

export default function ApartmentFilterPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const area = useSelector(selectArea);
  const roomTypes = useSelector(selectRoomTypes);
  const corps = useSelector(selectCorps);
  const yearsFilter = useSelector(selectYear);
  const date = new Date();
  const year = date.getFullYear();
  const [localArea, setLocalArea] = useState(area);
  const [localYear, setLocalYear] = useState(yearsFilter);
  const isInitialFilter =
    area === initialState.filters.area &&
    roomTypes === initialState.filters.selectedTypes &&
    corps === initialState.filters.corps &&
    yearsFilter === initialState.filters.year;

  const debouncedArea = useMemo(
    () =>
      debounce((e: number[]) => {
        dispatch(setAreaFilter([e[0], e[1]]));
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
      <button onClick={() => onClose()} className={s.closeBtn}>
        {closeIco}
      </button>
      <form action="#" className={s.form}>
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

        <div className={`${s.filterGroup} ${s.houseFilter}`}>
          <span className={s.filterOption}>Корпус</span>
          <div className={s.options}>
            {corpsNumbersArray.map((num) => {
              return (
                <label
                  className={`${corps.includes(num) ? s.selected : ""}`}
                  key={num}
                  htmlFor={`popup-corps-${num}`}
                >
                  <input
                    type="checkbox"
                    name="corps"
                    id={`popup-corps-${num}`}
                    onChange={() => dispatch(toggleCorps(num))}
                  />
                  № {num}
                </label>
              );
            })}
          </div>
        </div>

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
      </form>
      <button
        onClick={() => {
          if (!isInitialFilter) {
            dispatch(resetFilters());
            setLocalArea(initialState.filters.area);
            setLocalYear(initialState.filters.year);
          }
          onClose();
        }}
        className={s.falseSubmitBtn}
      >
        {isInitialFilter ? "Застосувати" : "Скинути"}
      </button>
    </div>
  );
}
