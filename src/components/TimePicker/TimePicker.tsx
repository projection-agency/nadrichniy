import { Formik, Form, Field, useFormikContext } from "formik";
import s from "./TimePicker.module.css";

const TIMES = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const TimePicker = () => {
  const {
    touched,
    errors,
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = useFormikContext<{
    time: string;
  }>();

  const toggleTime = (time: string) => {
    console.log(values)
    setFieldValue("time", time);
  };

  return (
    <div
      className={s.list}
      onBlur={(e) => {
        setFieldTouched("time", true);
        if (values.time == "") {
          setFieldError("time", "Оберіть час");
        }
      }}
    >
      {TIMES.map((time) => (
        <button
          key={time}
          type="button"
          className={`${s.button} ${
            values.time == time ? s.selected : ""
          } ${errors.time && touched.time ? s.error : ""}`}
          onClick={() => toggleTime(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimePicker;
