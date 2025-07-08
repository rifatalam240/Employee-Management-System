import React from "react";
import BannerCarousel from "./BannerCarousel";
import ServicesSection from "./ServicesSection";
import TestimonialSection from "./TestimonialSection";
import WhyChooseUs from "./WhyChooseUs";
import TeamSection from "./TeamSection";

const Home = () => {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <ServicesSection></ServicesSection>
      <TestimonialSection></TestimonialSection>
      <WhyChooseUs></WhyChooseUs>
      <TeamSection></TeamSection>
     
    </div>
  );
};

export default Home;
