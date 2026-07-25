"use client";
import { DateInput } from "rsuite";
import { useFormikContext } from "formik";
import s from "./FormDateInput.module.css";

type Props = {
  className: string;
};

function parseDateValue(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const normalized = value.includes(".")
    ? value
    : value.replace(/\//g, ".");
  const [day, month, year] = normalized.split(".").map(Number);
  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateValue(value: Date): string {
  const year = value.getFullYear();
  const day = String(value.getDate()).padStart(2, "0");
  const month = String(value.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${year}`;
}

const FormDateInput = ({ className }: Props) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<{
    date: string;
  }>();

  const handleChange = (value: Date | null) => {
    if (!value || Number.isNaN(value.getTime())) {
      setFieldValue("date", "", true);
      return;
    }
    setFieldValue("date", formatDateValue(value), true);
  };

  return (
    <DateInput
      format="dd/MM/yyyy"
      placeholder="23/10/2025"
      value={parseDateValue(values.date)}
      onBlur={() => {
        setFieldTouched("date", true, true);
      }}
      className={`${s.dateInput} ${className}`}
      onChange={handleChange}
      name="date"
    />
  );
};

export default FormDateInput;
