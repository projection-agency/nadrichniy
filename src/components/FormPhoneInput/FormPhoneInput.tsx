import PhoneInput from "react-phone-input-2";
import "./FormPhoneInput.css";
import "react-phone-input-2/lib/style.css";
import { useFormikContext } from "formik";

type Props = {
  value?: string;
  className?: string;
  id?: string;
  name: string;
};

const FormPhoneInput = ({ value, className, id, name }: Props) => {
  const { values,setFieldValue, setFieldError, setFieldTouched, errors } =
    useFormikContext<{
      number: string[];
    }>();

  const validatePhone = (phone: string) => {
    return phone.length < 19 ? "Введіть валідний номер" : undefined;
  };

  return (
    <div className={`${className} inputContainer`} id={id}>
      <PhoneInput
        containerClass={className}
        country={"ua"}
        value={value}
        onChange={(e) => {
          setFieldValue("phone", e);

          const error = validatePhone(e);
          console.log(values)
          if (error) {
            setFieldError("phone", error);
          } else {
            setFieldError("phone", undefined);
          }
        }}
        onFocus={() => {
          setFieldTouched("phone", true);
          console.log(errors);
        }}
        enableSearch={false}
        disableDropdown={false}
        inputProps={{
          name: name,
          required: true,
          autoFocus: false,
        }}
        placeholder="63 105 83 15"
      />
    </div>
  );
};

export default FormPhoneInput;
