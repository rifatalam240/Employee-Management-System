import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      MySwal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      let message = "Login failed!";
      if (error.message.includes("user-not-found")) {
        message = "Email doesn't exist.";
      } else if (error.message.includes("wrong-password")) {
        message = "Incorrect password.";
      }

      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#063C4C]">Login to Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-[#063C4C]"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-[#063C4C]"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#063C4C] text-white py-2 rounded-md hover:bg-[#052e3a] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#0a5a70] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
