"use client";
import Link from "next/link";
import Image from "next/image";
import s from "./ApartmentFilter.module.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAreaFilter,
  setFloorFilter,
  toggleRoomType,
} from "@/Redux/apartmentSlice/slice";
import { useSelector } from "react-redux";
import { selectArea, selectFloor } from "@/Redux/apartmentSlice/selectors";
import debounce from "@/utils/debounce";

const ApartmentFilter = () => {
  const dispatch = useDispatch();
  const area = useSelector(selectArea);
  const floor = useSelector(selectFloor);
  const [localArea, setLocalArea] = useState(area);
  const [localFloor, setLocalFloor] = useState(floor);


  const handleChangeArea = (e:number[]) => {
    dispatch(setAreaFilter([e[0], e[1]]))
  }

  const handleChangeFloor = (e:number[]) => {
    dispatch(setFloorFilter([e[0], e[1]]))
  }
  
  const debouncedArea = debounce(handleChangeArea,1000);
  const debouncedFloor = debounce(handleChangeFloor,1000)

  return (
    <div className={s.filter}>
      <form action="" className={s.form}>
        <div className={s.filterGroup}>
          <span className={s.filterOption}>Кількість кімнат</span>
          <div className={s.options}>
            <label>
              <input
                type="checkbox"
                name="rooms"
                value={1}
                onChange={() => dispatch(toggleRoomType("one-room"))}
              />
              1-кімнатні
            </label>
            <label>
              <input
                type="checkbox"
                name="rooms"
                value={2}
                onChange={() => dispatch(toggleRoomType("two-room"))}
              />
              2-кімнатні
            </label>
            <label>
              <input
                type="checkbox"
                name="rooms"
                value={3}
                onChange={() => dispatch(toggleRoomType("three-room"))}
              />
              3-кімнатні
            </label>
            <label>
              <input
                type="checkbox"
                name="rooms"
                value="commercial"
                onChange={() => dispatch(toggleRoomType("commercial"))}
              />
              Комерційні приміщення
            </label>
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
                onInput={(e) => {setLocalArea([e[0],e[1]]);debouncedArea(e)}}
              />
            </div>
          </div>
        </div>
        <div className={s.filterGroup}>
          <span className={s.filterOption}>Поверх</span>
          <div className="rangeCont">
            <div className={s.rangeValuesCont}>
              <p>
                <span className={s.min}>від</span>{" "}
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
                onInput={(e) =>{setLocalFloor([e[0],e[1]]);debouncedFloor(e)}}
              />
            </div>
          </div>
        </div>
        <Link href="#">
          Дивитися ще 162 варіанти{" "}
          <Image src={"/icons/arrow.svg"} width={9} height={8} alt="arrow" />
        </Link>
      </form>
    </div>
  );
};

export default ApartmentFilter;
