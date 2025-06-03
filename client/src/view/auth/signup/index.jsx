import { Link } from "react-router-dom";
import bg_image from "../../../assets/home banner.jpg";
import {Input, TagInput} from "../../../components/reuseable/input";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import useApi from "../../../hooks/use-api";

export default function Signup() {
  const {control, register, handleSubmit,formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [serverErrors, setServerErrors] = useState({});

const onSubmit = async (data) => {
    try {
      const response = await useApi.post("/auth/signup", data);
      console.log("User registered:", response.data);
      alert("User created successfully");
      setErrorMessage(""); 
      setServerErrors({});
    } catch (error) {
      console.log(error.response?.data?.message);

      const message = error.response?.data?.message;
      if (message) {
        setErrorMessage(message); 
      }

      if (error.response?.data?.errors) {
        const errorsObj = {};
        error.response.data.errors.forEach((err) => {
          const field = err.path[0]; 
          errorsObj[field] = err.message;
        });
        setServerErrors(errorsObj); 
      }
    }
  };

console.log("server error:", serverErrors)

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bg_image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/60 z-0" />

      <div className="relative z-10 flex justify-center items-center w-full h-full overflow-auto px-4">
        <div className="flex flex-col max-w-md w-full p-6 rounded-md sm:p-10 bg-gray-700/50 backdrop-blur-md text-gray-300 my-10">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">Welcome to our organization</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-start">
            <Input
              label="Username"
              name="username"
              register={register}
              placeholder="User name"
              errors={errors}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="*******"
              register={register}
              errors={errors}
            />
           <TagInput
              label="Shops"
              name="shops"
              placeholder="Enter your shops"
              control={control}
              errors={errors}
              serverError={serverErrors.shops}
            />
              {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer" htmlFor="remember">
                <input
                  id="remember"
                  type="checkbox"
                  name="remember"
                  className="accent-[#5b78f6]"
                />
                Remember Me
              </label>
              <Link
                to="/forgot-password"
                className="hover:underline hover:text-[#5b78f6] text-gray-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-[#5b78f6] hover:bg-[#4d6cf5] transition duration-300 w-full font-normal rounded-md py-2 text-white mt-2 cursor-pointer"
            >
              Continue
            </button>
          </form>

          <p className="px-6 text-sm text-center text-gray-400 mt-3">
            Already have an account?{" "}
            <Link
              to="/auth/signin"
              className="hover:underline hover:text-[#5b78f6] text-gray-300"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
