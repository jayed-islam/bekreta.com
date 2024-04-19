import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "../../components/material-tailwind-component/material-tailwind";

type CustomCheckboxProps = {
  name: string;
  label: string;
  helperText?: string;
  type?: string;
  sx: string;
};

const QNXCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  label,
  helperText,
  type = "checkbox",
  sx,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`mb-4 ${sx}`}>
          {/* <label className="flex items-center">
            <input {...field} type={type} className="mr-2" />
            {label}
          </label> */}
          <Checkbox
            crossOrigin={undefined}
            {...field}
            label={label}
            name={name}
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error.message}</p>
          )}
          {!error && helperText && (
            <p className="mt-2 text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      )}
    />
  );
};

export default QNXCheckbox;
