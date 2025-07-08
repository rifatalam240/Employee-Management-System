import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow , Pagination } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Ahmed",
    position: "HR Manager, SkyTech Ltd.",
    feedback:
      "This platform made it super easy to monitor employee tasks and process payroll on time. Very efficient!",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Tanvir Hasan",
    position: "Software Engineer, NexaCorp",
    feedback:
      "As an employee, I love how transparent and clean the workflow is. Submitting work updates is seamless.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Rita Das",
    position: "CEO, BrightHR",
    feedback:
      "This system helped our HR team save hours every week. Truly a game-changer in employee management.",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "Jahid Islam",
    position: "Project Manager, CodeCraft",
    feedback:
      "The dashboard is very user-friendly and helps us keep track of all employee tasks easily.",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#063C4C] mb-10">What People Say</h2>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full max-w-4xl"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide
              key={index}
              style={{ width: "320px" }}
              className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center
                filter brightness-75 grayscale transition duration-300 ease-in-out
                swiper-slide-active:filter-none swiper-slide-active:brightness-100 swiper-slide-active:grayscale-0"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#063C4C] mb-4"
              />
              <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
              <h4 className="text-xl font-semibold text-[#063C4C]">{t.name}</h4>
              <p className="text-gray-500">{t.position}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
