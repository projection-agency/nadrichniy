import PhoneInput from "react-phone-input-2";
import "./FormPhoneInput.css";
import "react-phone-input-2/lib/style.css";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
};

const customFlags = [
  {
    iso2: "ua",
    src: "/icons/flag-ua.svg",
  },
];

const FormPhoneInput = ({ value, onChange, className, id }: Props) => {
  return (
    <div className={className} id={id}>
      <PhoneInput
        country={"ua"}
        value={value}
        onChange={onChange}
        enableSearch={false}
        disableDropdown={false}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: false,
        }}
        placeholder="63 105 83 15"
      />
    </div>
  );
};

export default FormPhoneInput;
