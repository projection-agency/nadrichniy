"use client";
import { useState } from "react";
import Container from "@/components/Container/Container";
import s from "./QuestionsFormSection.module.css";
import Image from "next/image";
import FormPhoneInput from "../../FormPhoneInput/FormPhoneInput";
import { ReactNode } from "react";
import { DateInput } from "rsuite";
const initialValues = {
  username: "",
  number: "",
  email: "",
  date: Date.now(),
};

type ContainerProps = {
  className: string;
  children: ReactNode;
};

const timeWindows = [
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

const QuestionsFormSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [number, setNumber] = useState("");

  const toggleTime = (value: string) => {
    if (selectedTime.includes(value)) {
      setSelectedTime(selectedTime.filter((v) => v !== value));
    } else {
      selectedTime.push(value);
    }
  };

  const handleSubmit = (date: object) => {
    console.log(date);
  };

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <div className={s.sectionTitle}>
          <Image
            className={s.bg}
            src={"/images/formTitle_bg.jpg"}
            height={702}
            width={820}
            alt="image"
          />
          <Image
            className={s.titleIcon}
            src={"/icons/customer-service.svg"}
            height={140}
            width={140}
            alt="icon"
          />
          <h2>Зв&apos;яжіться з нами</h2>
          <p>
            Маєте запитання або хочете записатись на консультацію? Залиште свої
            контакти і ми вам зателефонуємо
          </p>
        </div>
        <div className={s.formContainer}>
          <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={s.inputLine}>
              <label className={`${s.label}`} htmlFor="forName">
                <p className={s.required}>Ваше ім&apos;я</p>
                <input
                  type="text"
                  placeholder="Введіть ім'я"
                  id="forName"
                  name="username"
                  autoComplete="off"
                  defaultValue={initialValues.username}
                />
              </label>
              <label className={`${s.label} ${s.phoneLabel}`} htmlFor="forTel">
                <p className={s.required}>Номер телефону</p>
                <FormPhoneInput
                  className={s.input}
                  id="forTel"
                  onChange={(value) => setNumber(value)}
                />
              </label>
            </div>

            <label className={s.emailLabel} htmlFor="forEmail">
              <p className={s.required}>Email</p>
              <input
                type="email"
                id="forEmail"
                name="email"
                autoComplete="off"
                placeholder="Введіть email"
                defaultValue={initialValues.email}
              />
            </label>

            <label className={s.dateLabel} htmlFor="forDate">
              <p className={s.required}>Оберіть дату для дзвінка</p>

              <div className={s.inputCont}>
                <Image
                  src={"/icons/calendar.svg"}
                  width={16}
                  height={16}
                  alt="calendar"
                />
                <DateInput
                placeholder="23/10/2025"
                  className={s.dateInput}
                  onChange={(value) => setSelectedDate(value)}
                />
              </div>
            </label>

            <div className={s.checkboxesCont}>
              <p className={s.required}>
                Зручний час для дзвінка (За Київським часом)
              </p>
              <ul className={s.list}>
                {timeWindows.map((item, idx) => {
                  return (
                    <li key={idx} className={s.item}>
                      <input
                        type="checkbox"
                        value={item}
                        name={`time${idx}`}
                        id={`${idx}`}
                        onChange={(e) => {
                          toggleTime(e.target.value);
                        }}
                      />
                      <label className={s.timeCheckbox} htmlFor={`${idx}`}>
                        {item}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button type="submit" className={s.submitBtn}>
              Замовити дзвінок
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default QuestionsFormSection;
