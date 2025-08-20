"use client";
import s from "./SpecifyPopup.module.css";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import FormPhoneInput from "../FormPhoneInput/FormPhoneInput";
import FormDateInput from "../FormDateInput/FormDateInput";
import TimePicker from "../TimePicker/TimePicker";
import Image from "next/image";
import { object, string } from "yup";
import { closeIco } from "../ModalContext";

import { formInstance } from "@/axios/axios";

const validationSchema = object({
  name: string().required("Введіть Ім'я"),
  phone: string().required("Введіть номер телефону"),
  date: string()
    .required("Оберіть дату")
    .test(
      "is-future-date",
      "Дата повинна бути сьогодні або пізніше",
      (value) => {
        if (!value) return false;

        const [day, month, year] = value.split(".").map(Number);
        const selectedDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      }
    ),
  email: string().email("Введіть валідний email").required("Введіть email"),
  time: string().min(1, "Оберіть час"),
});

const initialValues = {
  name: "",
  phone: "",
  email: "",
  date: null,
  time: "",
};

export default function SpecifyPopup({ onClose }: { onClose: () => void }) {
  const handleSubmit = async (values: FormikValues) => {
    console.log(values);
    // try {
    //   const response = await formInstance.post(
    //     "https://api.lcdoy.projection-learn.website/wp-json/applications/v1/call",
    //     values
    //   );
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className={s.popupOverlay}>
      <div className={s.container}>
        <button onClick={() => onClose()} className={s.closeBtn}>
          {closeIco}
        </button>

        <h3>Дізнатися ціну</h3>
        <p className={s.upperDescr}>
          Залиште свої контакти — ми зателефонуємо і підкажемо точну вартість.
        </p>
        <div className={s.formContainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className={s.form}>
                <div className={s.inputLine}>
                  <label className={`${s.label}`} htmlFor="forName">
                    <p className={s.required}>Ваше ім&apos;я</p>
                    <Field
                      className={errors.name && touched.name ? s.error : ""}
                      as="input"
                      type="text"
                      placeholder="Введіть ім'я"
                      id="forName"
                      name="name"
                      autoComplete="off"
                      required={true}
                    />
                    <ErrorMessage name="name">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                  <label className={`${s.label}`} htmlFor="forTel">
                    <p className={s.required}>Номер телефону</p>
                    <FormPhoneInput
                      className={`${s.phone} ${
                        errors.phone && touched.phone ? s.error : ""
                      }`}
                      id="forTel"
                      name="phone"
                    />
                    <ErrorMessage name="phone">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                </div>

                <label className={s.dateLabel} htmlFor="forDate">
                  <p className={s.required}>Оберіть дату для дзвінка</p>

                  <div className={s.inputCont}>
                    <Image
                      src={"/icons/calendar.svg"}
                      width={16}
                      height={16}
                      alt="calendar"
                    />
                    <FormDateInput
                      className={errors.date && touched.date ? s.error : ""}
                    />
                    <ErrorMessage name="date">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                </label>

                <div className={s.checkboxesCont}>
                  <p className={s.required}>
                    Зручний час для дзвінка (За Київським часом)
                  </p>
                  <TimePicker />
                  <ErrorMessage name="time">
                    {(msg) => <div className={s.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <button type="submit" className={s.submitBtn}>
                  Залишити заявку
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
