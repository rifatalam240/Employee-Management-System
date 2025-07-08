import React, { useEffect, useRef, useState } from "react";
import { FaChartBar, FaShieldAlt, FaUsers, FaRegBell } from "react-icons/fa";

// Counter animation hook
function useCountUp(end, inView, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, inView, duration]);
  return count;
}

// Intersection observer hook
function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);
  return inView;
}

const stats = [
  {
    icon: <FaChartBar className="text-5xl text-[#0a5a70] mb-4" />,
    value: 120,
    label: "Active Employees",
  },
  {
    icon: <FaShieldAlt className="text-5xl text-[#0a5a70] mb-4" />,
    value: 45,
    label: "HR Executives",
  },
  {
    icon: <FaUsers className="text-5xl text-[#0a5a70] mb-4" />,
    value: 350,
    label: "Projects Managed",
  },
  {
    icon: <FaRegBell className="text-5xl text-[#0a5a70] mb-4" />,
    value: 99,
    label: "Automated Alerts",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <section className="bg-[#F9FBFC] py-16" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#063C4C] mb-2">
          Why Choose <span className="text-[#0a5a70]">WorkFlowPro?</span>
        </h2>
        <p className="text-gray-600 mb-10 text-base md:text-lg">
          Trusted by leading companies for transparent, efficient, and secure employee management.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const count = useCountUp(stat.value, inView, 30000);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg flex flex-col items-center py-8 px-4"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                }}
              >
                {stat.icon}
                <div className="text-3xl md:text-4xl font-bold text-[#063C4C] mb-1">
                  {count}
                  <span className="text-2xl md:text-3xl text-[#0a5a70] font-normal">+</span>
                </div>
                <div className="text-[#0a5a70] text-base md:text-lg">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;