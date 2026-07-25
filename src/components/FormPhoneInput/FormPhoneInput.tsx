import PhoneInput from "react-phone-input-2";
import "./FormPhoneInput.css";
import "react-phone-input-2/lib/style.css";
import { useFormikContext } from "formik";

type Props = {
  className?: string;
  id?: string;
  name: string;
};

const FormPhoneInput = ({ className, id, name }: Props) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<{
    phone: string;
  }>();

  return (
    <div className={`${className ?? ""} inputContainer`} id={id}>
      <PhoneInput
        containerClass={className}
        country={"ua"}
        value={values.phone || ""}
        onChange={(phone) => {
          setFieldValue(name, phone, true);
        }}
        onBlur={() => {
          setFieldTouched(name, true, true);
        }}
        enableSearch={false}
        disableDropdown={false}
        inputProps={{
          name,
          autoFocus: false,
        }}
        placeholder="63 105 83 15"
      />
    </div>
  );
};

export default FormPhoneInput;
