import React from "react";
import Select, {
  MenuPlacement,
  OnChangeValue,
  StylesConfig,
} from "react-select";
interface IOptions {
  value: string;
  label: string;
  hourType?: string;
  hour?: string;
}
const TimeInput: React.FC<any> = ({
  defaultValue,
  name,
  setForm,
  options,
  form,
  menuPlacement,
}) => {
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
    }),
    menu: (provided, state) => ({
      ...provided,
      border: "none",
    }),
  };
  console.log(options);
  return (
    <Select
      menuPlacement={menuPlacement}
      className="basic-single"
      classNamePrefix="select"
      defaultValue={defaultValue}
      styles={customStyles}
      name={name}
      options={options}
      onChange={(event: OnChangeValue<any, false>, action) => {
        if (action.name === "hour") {
          setForm({
            ...form,
            hour: Number(event.value),
          });
        } else if (action.name === "minute") {
          setForm({
            ...form,
            minute: Number(event.value),
          });
        }
      }}
    />
  );
};

export default TimeInput;
