import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import Input from "~/components/input";

interface FormValues {
  email: string;
  password: string;
  phone: string;
  address: string;
  education: string;
}

export default function FormHandler() {
  // 1. keep the whole object, not just { register, handleSubmit }
  const methods = useForm<FormValues>({
    defaultValues: { email: "", password: "", phone: "", address: "", education: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className="mt-24 flex w-full justify-center">
      {/* 2. spread it into the provider so every child can call useFormContext() */}
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border border-slate-900 p-4"
        >
          <h1 className="text-center text-2xl">DYNAMIC FORM</h1>

          {/* 3. one line per field */}
          <Input name="email" label="Email" type="email" placeholder="Enter your email"
                 roles={{ required: true }} />
          <Input name="password" label="Password" type="password" placeholder="Enter your password"
                 roles={{ required: true, minLength: 8 }} />
          <Input name="phone" label="Phone" type="tel" placeholder="Enter your phone"
                 roles={{ required: true, pattern: "^[0-9]{10}$" }} />
          <Input name="address" label="Address" type="text" placeholder="Enter your address"
                 roles={{ required: true }} />
          <Input name="education" label="Education" type="text" placeholder="Enter your education"
                 roles={{ required: true }} />

          <div className="flex justify-center gap-4">
            <button type="submit" className="rounded-4xl border border-blue-400 bg-sky-100 p-4">
              Register
            </button>
            <button type="button" className="text-red-500 underline">
              Redirect to Login
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
