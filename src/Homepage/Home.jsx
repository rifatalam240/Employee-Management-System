import React from "react";
import BannerCarousel from "./BannerCarousel";
import ServicesSection from "./ServicesSection";
import TestimonialSection from "./TestimonialSection";
import WhyChooseUs from "./WhyChooseUs";
import TeamSection from "./TeamSection";
import FAQSection from "./FAQSection";
import KeyFeaturesSection from "./KeyFeaturesSection";
import MissionVision from "./MissionVision ";

const Home = () => {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <ServicesSection></ServicesSection>
      <KeyFeaturesSection></KeyFeaturesSection>
      <TestimonialSection></TestimonialSection>
     
      <TeamSection></TeamSection>
      <MissionVision></MissionVision>
       <FAQSection></FAQSection>
       <WhyChooseUs></WhyChooseUs>
      
     
    </div>
  );
};

export default Home;
