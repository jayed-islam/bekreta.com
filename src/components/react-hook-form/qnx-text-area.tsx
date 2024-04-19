import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "../material-tailwind/material-tailwind-components";

type CustomTextFieldProps = {
  name: string;
  type?: string;
  helperText?: string;
  label: string;
  placeholder?: string;
  sx?: string;
  rows?: number;
};

const QNXTextArea: React.FC<CustomTextFieldProps> = ({
  name,
  type = "text",
  helperText,
  placeholder,
  rows = 3,
  label,
  sx,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`max-w-[100%] ${sx}`}>
          <Textarea
            label={label}
            {...field}
            id={name}
            size="lg"
            rows={rows}
            placeholder={placeholder}
            variant="outlined"
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

export default QNXTextArea;
