import React from "react";
import Swal from "sweetalert2";
import UseAuth from "../context/UseAuth";
import useAxiossecure from "../coustomHook/useAxiossecure";
import Loading_spinner from "../Pages/LoadingPage";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiossecure();
  const { user, loading } = UseAuth();

  // ✅ Show loading spinner properly
  if (loading) {
    return <Loading_spinner />;
  }

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/contact-messages", data);
      Swal.fire("Thank you!", "Your message has been sent.", "success");
      reset();
    } catch (err) {
      Swal.fire("Error", "Failed to send message.", "error");
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#f9fbfc] px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-8 flex flex-col md:flex-row gap-8">
        {/* Address */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#063C4C] mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            We'd love to hear from you! Please fill out the form and we'll get
            back to you soon.
          </p>
          <div className="mb-2">
            <span className="font-semibold text-[#0a5a70]">Address:</span>
            <p className="text-gray-600">
              WorkFlowPro Ltd.
              <br />
              1234 Corporate Avenue,
              <br />
              Gulshan, Dhaka 1212, Bangladesh
            </p>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-[#0a5a70]">Email:</span>
            <p className="text-gray-600">info@workflowpro.com</p>
          </div>
          <div>
            <span className="font-semibold text-[#0a5a70]">Phone:</span>
            <p className="text-gray-600">+880 1234-567890</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border px-4 py-2 rounded focus:outline-[#063C4C]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              })}
              className="w-full border px-4 py-2 rounded focus:outline-[#063C4C] resize-none"
              rows={5}
              placeholder="Type your message here..."
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#063C4C] text-white py-2 rounded hover:bg-[#052e3a] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
export default ContactUs;
