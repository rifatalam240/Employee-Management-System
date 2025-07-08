import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";
import useAxiossecure from "../coustomHook/useAxiossecure";
import UseAuth from "../context/UseAuth";
import axios from "axios";

const MySwal = withReactContent(Swal);

const Register = () => {
  const navigate = useNavigate();
  const axiossecure = useAxiossecure();
  const { createuser, updateprofilepic } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      role,
      salary,
      bankAccount,
      designation,
      photo,
    } = data;

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      return MySwal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters, contain one capital letter and one special character.",
      });
    }

    try {
      // 1. Upload Image to imgbb
      const formData = new FormData();
      formData.append("image", photo[0]);
      const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`;
      const res = await axios.post(url, formData);
      const imageUrl = res.data.data.display_url;

      // 2. Create user in Firebase using AuthProvider
      const userCredential = await createuser(email, password);
      const user = userCredential.user;

      // 3. Update profile using AuthProvider
      await updateprofilepic({
        displayName: name,
        photoURL: imageUrl,
      });

      // 4. Save user info to backend
      const userInfo = {
        name,
        email,
        role,
        salary: parseFloat(salary),
        bankAccount,
        designation,
        image: imageUrl,
        isVerified: false,
      };

      await axiossecure.post("/users", userInfo);

      // 5. Alert and redirect
      MySwal.fire({
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      navigate("/login");
    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#063C4C]">
          Register Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.name && (
            <p className="text-sm text-red-500">Name is required</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-500">Email is required</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              Password is required and must be valid
            </p>
          )}

          {/* Role Dropdown */}
          <select
            {...register("role", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-500">Role is required</p>
          )}

          {/* Designation */}
          <input
            type="text"
            placeholder="Designation (e.g., Sales Executive)"
            {...register("designation", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.designation && (
            <p className="text-sm text-red-500">Designation is required</p>
          )}

          {/* Salary */}
          <input
            type="number"
            placeholder="Salary"
            {...register("salary", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.salary && (
            <p className="text-sm text-red-500">Salary is required</p>
          )}

          {/* Bank Account No */}
          <input
            type="text"
            placeholder="Bank Account Number"
            {...register("bankAccount", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.bankAccount && (
            <p className="text-sm text-red-500">Bank Account No. is required</p>
          )}

          {/* Profile Photo */}
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            className="w-full"
          />
          {errors.photo && (
            <p className="text-sm text-red-500">Photo is required</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#063C4C] text-white py-2 rounded-md hover:bg-[#052e3a] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;