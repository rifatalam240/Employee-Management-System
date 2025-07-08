import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Swiper CSS is already imported globally in src/index.css

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
    <section className="py-10 bg-white">
      <div className="max-w-4xl mx-auto px-2 text-center">
        <h2 className="text-2xl font-bold text-[#063C4C] mb-6">What People Say</h2>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 1.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full max-w-2xl"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide
              key={index}
              style={{ width: "220px" }}
              className="bg-white rounded-lg p-3 shadow flex flex-col items-center
                filter brightness-90 grayscale transition duration-300 ease-in-out
                swiper-slide-active:filter-none swiper-slide-active:brightness-100 swiper-slide-active:grayscale-0"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#063C4C] mb-2"
              />
              <p className="text-gray-700 italic text-sm mb-2 line-clamp-3">“{t.feedback}”</p>
              <h4 className="text-base font-semibold text-[#063C4C]">{t.name}</h4>
              <p className="text-xs text-gray-500">{t.position}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;