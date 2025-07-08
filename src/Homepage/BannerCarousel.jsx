import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const BannerCarousel = () => {
  return (
    <section className="bg-white">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
      >
        {/* Slide 1 */}
        <div className="h-[450px] md:h-[500px] flex items-center justify-center bg-[#063C4C] text-white px-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Empower Your Workforce</h2>
            <p className="text-lg md:text-xl">
              Manage employees, track work hours & streamline HR operations.
            </p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="h-[450px] md:h-[500px] flex items-center justify-center bg-[#0E5D6A] text-white px-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Real-time Task Tracking</h2>
            <p className="text-lg md:text-xl">
              Employees submit work reports, HR reviews them instantly.
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="h-[450px] md:h-[500px] flex items-center justify-center bg-[#14919B] text-white px-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Automated Payroll</h2>
            <p className="text-lg md:text-xl">
              Secure salary payment and history tracking for each employee.
            </p>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default BannerCarousel;
