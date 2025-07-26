import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UseAuth from "../context/UseAuth";
import useAxiossecure from "../coustomHook/useAxiossecure";
import { FcGoogle } from "react-icons/fc"; // ✅ Google Icon Import

const MySwal = withReactContent(Swal);

const Login = () => {
  const { signin, sociallogin } = UseAuth();
  const axiossecure = useAxiossecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signin(email, password);

      MySwal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
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

const handleGoogleLogin = async () => {
  try {
    const result = await sociallogin();
    // console.log("✅ Google login result:", result);

    const user = result.user;
    // console.log("✅ Google User:", user);

    const response = await axiossecure.get(`/users?email=${user.email}`);
    // console.log("✅ User exists check response:", response.data);

    if (response.data.length === 0) {
      const socialUserInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "employee",
        salary: 10000,
        bankAccount: "N/A",
        designation: "Employee",
        isVerified: false,
      };

      // console.log("🟢 Sending new user to backend:", socialUserInfo);

      const insertRes = await axiossecure.post("/users", socialUserInfo);
      // console.log("✅ Inserted response:", insertRes.data);
    }

    Swal.fire({
      icon: "success",
      title: "Google Login Successful",
    });

    navigate("/");
  } catch (err) {
    console.error("❌ Google login error:", err);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: err.message,
    });
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#063C4C]">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-[#063C4C]"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-[#063C4C]"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#063C4C] text-white py-2 rounded-md hover:bg-[#052e3a] transition"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Button with Icon */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-violet-600 text-violet-700 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-violet-50 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#0a5a70] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
