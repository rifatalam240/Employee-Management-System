import { FaClipboardCheck, FaUsersCog, FaMoneyCheckAlt, FaChartLine } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <section className="py-16 bg-[#F9FDFD] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#063C4C] dark:text-gray-600 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-10 text-lg">
          We provide smart solutions for your workforce management
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-[#063C4C] text-5xl mb-4">
              <FaClipboardCheck />
            </div>
            <h3 className="text-xl font-semibold dark:text-gray-400 mb-2">Task Tracking</h3>
            <p className="text-gray-600">
              Employees can submit daily work updates and view progress reports.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-[#063C4C] text-5xl mb-4">
              <FaUsersCog />
            </div>
            <h3 className="text-xl font-semibold dark:text-gray-400 mb-2">HR Management</h3>
            <p className="text-gray-600">
              HRs can verify employees, manage tasks, and oversee departments.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-[#063C4C] text-5xl mb-4">
              <FaMoneyCheckAlt />
            </div>
            <h3 className="text-xl font-semibold dark:text-gray-400 mb-2">Payroll System</h3>
            <p className="text-gray-600">
              Automatic and secure salary payments with full history tracking.
            </p>
          </div>

          {/* Service 4 (extra) */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-[#063C4C] text-5xl mb-4">
              <FaChartLine />
            </div>
            <h3 className="text-xl dark:text-gray-400 font-semibold mb-2">Progress Analytics</h3>
            <p className="text-gray-600">
              Get visual reports of employee work trends, time logs, and growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
