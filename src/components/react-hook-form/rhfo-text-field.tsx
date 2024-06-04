import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Icon } from "@iconify-icon/react";
import { Input } from "../material-tailwind/material-tailwind-components";

type CustomTextFieldProps = {
  name: string;
  type?: "text" | "number" | "email" | "password";
  helperText?: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  sx?: string;
};

const RHFOTextField: React.FC<CustomTextFieldProps> = ({
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`w-full  ${sx}`}>
          <Input
            icon={
              type === "password" && (
                <button type="button" onClick={handleClickShowPassword}>
                  {showPassword ? (
                    <Icon icon="octicon:eye-closed-24" />
                  ) : (
                    <Icon icon="solar:eye-linear" />
                  )}
                </button>
              )
            }
            label={label}
            {...field}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            value={type === "number" && field.value === 0 ? "" : field.value}
            id={name}
            className={`py-2 appearance-none  ${
              readOnly && "bg-gray-200"
            } w-full`}
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

export default RHFOTextField;
