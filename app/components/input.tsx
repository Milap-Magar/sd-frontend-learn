import { useFormContext } from "react-hook-form";
import { twJoin } from 'tailwind-merge';

type InputField = {
    name: string;
    label: string;
    type: "text" | "email" | "tel" | "password" | "select" 
    roles?: { required?: boolean; pattern?: string; minLength?: number };
    async?: "username name available"
    showWhen?: { field: string; equals: string; }
    classname?: string;
    placeholder: string;
};

export default function Input({ name, label, type, placeholder, roles, classname }: InputField) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full flex flex-col gap-0.5">
      <label htmlFor={name} className="text-lg w-24">{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={twJoin("border border-slate-500 p-2", classname)}
        {...register(name, {
          required: roles?.required,
          pattern: roles?.pattern ? { value: new RegExp(roles.pattern), message: "Invalid format" } : undefined,
          minLength: roles?.minLength,
        })}
      />
      {error && <p role="alert" className="text-red-600">{error}</p>}
    </div>
  );
}
