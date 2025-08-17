const MissionVision = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Our Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To simplify employee management by providing an easy-to-use system 
              that saves time for HR, Admin, and Employees while ensuring transparency.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To build smarter organizations where employee management is 
              fully automated, transparent, and future-ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
