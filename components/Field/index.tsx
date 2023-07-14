import cn from "classnames";
import styles from "./Field.module.sass";
import Icon from "@/components/Icon";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

type FieldProps = {
  className?: string;
  id?: string;
  onClick?: any;
  inputClassName?: string;
  textarea?: boolean;
  type?: string;
  value?: string;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  required?: boolean;
  children?: any;
  icon?: string;
  autoFocus?: any;
  light?: boolean;
  large?: boolean;
  label?: string;
  error?: any;
  style?: any;
  register?: UseFormRegisterReturn;
};

const Field = ({
  className,
  id,
  inputClassName,
  textarea,
  type,
  value,
  onChange,
  placeholder,
  required,
  icon,
  autoFocus,
  light,
  large,
  label,
  onClick,
  onBlur,
  error,
  style,
  register,
}: FieldProps) => (
  <div
    className={cn(
      styles.field,
      { [styles.fieldIcon]: icon },
      { [styles.fieldTextarea]: textarea },
      { [styles.fieldLight]: light },
      { [styles.fieldLarge]: large },
      className
    )}
  >
    <div className={styles.wrap}>
      {textarea ? (
        <textarea
          className={styles.textarea}
          value={value}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          onBlur={onBlur}
          {...register}
        ></textarea>
      ) : (
        <input
          className={cn(styles.input, inputClassName)}
          type={type || "text"}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          {...register}
        />
      )}
      {icon && <Icon className={styles.icon} name={icon} onClick={onClick} />}
    </div>
    {label && <div className={styles.label}>{label}</div>}
  </div>
);

export default Field;
