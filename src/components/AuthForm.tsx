import React, { FC } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { StyledInput } from "./shared";

interface SignUpFormValues extends FieldValues {
  username: string;
  email: string;
  password: string;
}

interface LoginFormValues extends FieldValues {
  loginEmail: string;
  loginPassword: string;
}

const AuthForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>();

  const onSubmitSignUp: SubmitHandler<SignUpFormValues> = (data) => {
    console.log("Sign Up Data:", data);
  };

  const onSubmitLogin: SubmitHandler<LoginFormValues> = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="main-form w-[450px] h-[500px] bg-[#3488ac] overflow-hidden bg-cover bg-center bg-no-repeat rounded-[10px] shadow-md">
      <input type="checkbox" id="chk" className="hidden" />

      <div className="relative size-full signup">
        <form
          onSubmit={handleSubmit(onSubmitSignUp)}
          className="flex flex-col items-center"
        >
          <label
            htmlFor="chk"
            className="text-white text-[2.3em] font-bold cursor-pointer transition-transform duration-500 ease-in-out flex justify-center my-[1.125rem]"
          >
            Sign up
          </label>

          <StyledInput
            type="text"
            label="Full Name"
            register={register("username", { required: true })}
            required={true}
          />
          {errors.username && (
            <span className="text-red-500">Username is required</span>
          )}

          <StyledInput
            type="email"
            label="Email"
            register={register("email", { required: true })}
            required={true}
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}

          <StyledInput
            type="password"
            label="Password"
            register={register("password", { required: true })}
            required={true}
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}

          <button
            type="submit"
            className="w-[60%] mt-4 py-2 text-[#3488ac] bg-white rounded-[5px] font-bold hover:bg-[#eeeeee] hover:scale-[1.05] transition-colors duration-500 ease-in"
          >
            Sign up
          </button>
        </form>
      </div>

      <div className="login h-[460px] bg-[#eee] rounded-[60%_/_10%] transform -translate-y-[110px] transition-transform duration-[800ms] ease-in-out">
        <form
          onSubmit={handleSubmitLogin(onSubmitLogin)}
          className="flex flex-col items-center"
        >
          <label
            htmlFor="chk"
            className="text-[#3488ac] text-[2.3em] font-bold cursor-pointer transition-transform duration-500 transform scale-[.6] my-[20px]"
          >
            Login
          </label>

          <StyledInput
            type="email"
            label="Email"
            register={registerLogin("loginEmail", { required: true })}
            required={true}
          />
          {loginErrors.loginEmail && (
            <span className="text-red-500">Email is required</span>
          )}

          <StyledInput
            type="password"
            label="Password"
            register={registerLogin("loginPassword", { required: true })}
            required={true}
          />
          {loginErrors.loginPassword && (
            <span className="text-red-500">Password is required</span>
          )}

          <button
            type="submit"
            className="w-[60%] mt-10 py-2 text-white bg-[#3488ac] rounded-[5px] font-bold hover:bg-[#2d7898] transition-colors duration-500 hover:scale-[1.05]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
