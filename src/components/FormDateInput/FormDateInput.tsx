"use client";
import { DateInput } from "rsuite";
import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import s from "./FormDateInput.module.css";
import { error } from "console";

type Props = {
  className: string;
};
const FormDateInput = ({ className }: Props) => {
  const { values, setFieldValue, setFieldError, errors, setFieldTouched } =
    useFormikContext<{
      date: string;
    }>();

  const [now, setNow] = useState<string | number | undefined>();

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setNow(`${day}/${month}/${year}`);
  }, []);

  const handleChange = (value: Date | null) => {
    if (!value) return;

    const year = value.getFullYear();
    const day = String(value.getDate()).padStart(2, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const fieldValueToPost = `${day}.${month}.${year}`;

    setFieldValue("date", fieldValueToPost);
  };

  const handleError = (value: string) => {
    setFieldError("date", value);
  };

  const handleFieldTouched = () => {
    setFieldTouched("date", true);
  };

  return (
    <DateInput
      min={now}
      placeholder="23/10/2025"
      onBlur={(e) => {
        handleFieldTouched();
        if (!values.date) {
          handleError("Оберіть дату");
        }
      }}
      className={`${s.dateInput} ${className}`}
      onChange={(value) => {
        handleChange(value);
        console.log(values);
      }}
      required={true}
      name="date"
    />
  );
};

export default FormDateInput;
