import { Link} from "react-router-dom";
import bg_image from "../../../assets/home banner.jpg";
import { Input } from "../../../components/reuseable/input";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/use-api";

export default function Signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();


 const onSubmit = async (data) => {
  try {
    const response = await useApi.post("/auth/signin", data);
    // console.log("User signin:", response.data);
    alert("User logged in successfully");
  } catch (error) {
    const message = error.response?.data?.message;
    if (message?.includes("not found")) {
      setError("username", {
        type: "server",
        message: "User not found",
      });
    } else if (message?.includes("Incorrect password")) {
      setError("password", {
        type: "server",
        message: "Incorrect password",
      });
    } else {
      // fallback: show general form-level error
      alert(message || "Something went wrong");
    }
  }
};

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
            <h1 className="my-3 text-4xl font-bold">Log In</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-start"
          >
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

            <div className="flex items-center justify-between text-sm">
              <label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="remember"
              >
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
              className="bg-[#5b78f6] hover:bg-[#4d6cf5] [transition:0.3s] w-full font-normal rounded-md py-2 text-white mt-2 cursor-pointer"
            >
              Continue
            </button>
          </form>

          <p className="px-6 text-sm text-center text-gray-400 mt-3">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/auth/register"
              className="hover:underline hover:text-[#5b78f6] text-gray-300"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
