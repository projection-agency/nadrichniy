"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import Container from "@/components/Container/Container";
import s from "./QuestionsFormSection.module.css";
import Image from "next/image";
import FormPhoneInput from "../../FormPhoneInput/FormPhoneInput";
import FormDateInput from "@/components/FormDateInput/FormDateInput";
import TimePicker from "@/components/TimePicker/TimePicker";
import { FormikValues } from "formik";
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

const QuestionsFormSection = () => {
  const handleSubmit = async (values: FormikValues) => {
    console.log(values)
    try {
      const response = await formInstance.post(
        "https://api.lcdoy.projection-learn.website/wp-json/applications/v1/call",
        values
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

                <label className={s.emailLabel} htmlFor="forEmail">
                  <p className={s.required}>Email</p>
                  <Field
                    className={errors.email && touched.email ? s.error : ""}
                    as="input"
                    type="email"
                    id="forEmail"
                    name="email"
                    autoComplete="off"
                    placeholder="Введіть email"
                    required={true}
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
                  <TimePicker></TimePicker>
                  <ErrorMessage name="time">
                    {(msg) => <div className={s.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <button type="submit" className={s.submitBtn}>
                  Замовити дзвінок
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </section>
  );
};

export default QuestionsFormSection;

// <ul className={s.list}>
//   {timeWindows.map((item, idx) => {
//     return (
//       <li key={idx} className={s.item}>
//         <Field
//           type="checkbox"
//           value={item}
//           name={`time`}
//           id={`${idx}`}
//           onChange={(e) => {
//             toggleTime(e.target.value);
//           }}
//           onClick={() => console.log(item)}
//         />
//         <label className={s.timeCheckbox} htmlFor={`${idx}`}>
//           {item}
//         </label>
//       </li>
//     );
//   })}
// </ul>
