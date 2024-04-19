import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../material-tailwind-component/material-tailwind";

type CustomTextFieldProps = {
  name: string;
  type?: "text" | "number" | "email" | "password";
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  sx?: string;
};

const QNXOutlineTextField: React.FC<CustomTextFieldProps> = ({
  name,
  type = "text",
  helperText,
  placeholder,
  label,
  disabled = false,
  readOnly = false,
  sx,
}) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`max-w-[100%] ${sx}`}>
          <Input
            crossOrigin={undefined}
            {...field}
            type={type}
            value={type === "number" && field.value === 0 ? "" : field.value}
            id={name}
            // className={`py-2 appearance-none ${readOnly && "bg-gray-200"}`}
            className={` ${
              readOnly
                ? "cursor-not-allowed !border !border-gray-300"
                : "!border !border-gray-300 text-gray-900  placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            }`}
            size="lg"
            readOnly={readOnly}
            placeholder={placeholder}
            onChange={(event) => {
              if (type === "number") {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            labelProps={{
              className: "hidden",
            }}
            disabled={disabled}
            error={!!error}
          />

          {error && (
            <p className="mt-1 ml-3 text-xs text-red-500">{error.message}</p>
          )}
          {!error && helperText && (
            <p className="mt-1 text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      )}
    />
  );
};

export default QNXOutlineTextField;
