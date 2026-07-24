"use client";
import s from "./ContactPopup.module.css";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import FormPhoneInput from "../FormPhoneInput/FormPhoneInput";
import FormDateInput from "../FormDateInput/FormDateInput";
import TimePicker from "../TimePicker/TimePicker";
import Image from "next/image";
import { object, string } from "yup";
import { closeIco } from "../ModalContext";
import { useState } from "react";

import { formInstance } from "@/axios/axios";
import { API_URL } from "@/constants";

const validationSchema = object({
  name: string().trim().required("Введіть Ім'я"),
  phone: string()
    .required("Введіть номер телефону")
    .test("phone-length", "Введіть валідний номер", (value) => {
      if (!value) return false;
      const digits = value.replace(/\D/g, "");
      return digits.length >= 12;
    }),
  date: string()
    .required("Оберіть дату")
    .test(
      "is-future-date",
      "Дата повинна бути сьогодні або пізніше",
      (value) => {
        if (!value) return false;

        const normalized = value.includes(".")
          ? value
          : value.replace(/\//g, ".");
        const [day, month, year] = normalized.split(".").map(Number);
        if (!day || !month || !year) return false;

        const selectedDate = new Date(year, month - 1, day);
        if (Number.isNaN(selectedDate.getTime())) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      }
    ),
  email: string().email("Введіть валідний email").required("Введіть email"),
  time: string().required("Оберіть час"),
});

const initialValues = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
};

export default function ContactPopup({ onClose }: { onClose: () => void }) {
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: FormikValues) => {
    setSubmitError("");
    try {
      await formInstance.post(
        `${API_URL}/wp-json/applications/v1/call`,
        values
      );
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError("Не вдалося надіслати заявку. Спробуйте ще раз.");
    }
  };

  return (
    <div
      className={s.popupOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={s.container}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button type="button" onClick={() => onClose()} className={s.closeBtn}>
          {closeIco}
        </button>

        {submitted ? (
          <div className={s.successState}>
            <h3>Заявку надіслано</h3>
            <p className={s.upperDescr}>
              Дякуємо! Ми зателефонуємо у зручний для вас час.
            </p>
            <button type="button" className={s.submitBtn} onClick={onClose}>
              Закрити
            </button>
          </div>
        ) : (
          <>
            <h3>Зв’яжіться з нами</h3>
            <p className={s.upperDescr}>
              Маєте запитання або хочете записатись на консультацію? Залиште
              свої контакти і ми вам зателефонуємо
            </p>
            <div className={s.formContainer}>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ errors, touched, isSubmitting, submitCount }) => (
                  <Form className={s.form} noValidate>
                    <div className={s.inputLine}>
                      <label className={`${s.label}`} htmlFor="forName">
                        <p className={s.required}>Ваше ім&apos;я</p>
                        <Field
                          className={
                            errors.name && (touched.name || submitCount)
                              ? s.error
                              : ""
                          }
                          as="input"
                          type="text"
                          placeholder="Введіть ім'я"
                          id="forName"
                          name="name"
                          autoComplete="off"
                        />
                        <ErrorMessage name="name">
                          {(msg) => <div className={s.errorMessage}>{msg}</div>}
                        </ErrorMessage>
                      </label>
                      <label className={`${s.label}`} htmlFor="forTel">
                        <p className={s.required}>Номер телефону</p>
                        <FormPhoneInput
                          className={`${s.phone} ${
                            errors.phone && (touched.phone || submitCount)
                              ? s.error
                              : ""
                          }`}
                          id="forTel"
                          name="phone"
                        />
                        <ErrorMessage name="phone">
                          {(msg) => <div className={s.errorMessage}>{msg}</div>}
                        </ErrorMessage>
                      </label>
                    </div>

                    <label className={s.emailLabel} htmlFor="forEmail">
                      <p className={s.required}>Email</p>
                      <Field
                        className={
                          errors.email && (touched.email || submitCount)
                            ? s.error
                            : ""
                        }
                        as="input"
                        type="email"
                        id="forEmail"
                        name="email"
                        autoComplete="off"
                        placeholder="Введіть email"
                      />
                      <ErrorMessage name="email">
                        {(msg) => <div className={s.errorMessage}>{msg}</div>}
                      </ErrorMessage>
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
                        <FormDateInput
                          className={
                            errors.date && (touched.date || submitCount)
                              ? s.error
                              : ""
                          }
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

                    {submitError ? (
                      <p className={s.formError}>{submitError}</p>
                    ) : null}

                    <button
                      type="submit"
                      className={s.submitBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Надсилаємо..." : "Замовити дзвінок"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
