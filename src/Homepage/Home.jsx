import React from "react";
import BannerCarousel from "./BannerCarousel";
import ServicesSection from "./ServicesSection";
import TestimonialSection from "./TestimonialSection";

const Home = () => {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <ServicesSection></ServicesSection>
      <TestimonialSection></TestimonialSection>
    </div>
  );
};

export default Home;
