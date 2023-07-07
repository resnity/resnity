import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type ControlledTextFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Omit<TextFieldProps, 'name'>;

export const ControlledTextField = <T extends FieldValues = FieldValues>({
  name,
  control,
  ...props
}: ControlledTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <TextField
          {...props}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          error={error !== undefined}
          helperText={error?.message}
        />
      )}
    />
  );
};
