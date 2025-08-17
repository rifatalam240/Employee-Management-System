import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I add a new employee to the system?",
    answer:
      "Only Admin or HR users can add a new employee. Go to the dashboard, open the 'Add Employee' form, and fill in details like name, email, designation, and salary.",
  },
  {
    question: "How is employee attendance tracked?",
    answer:
      "Employees log in to their dashboards and submit daily tasks. HR and Admin can view reports to track total working hours and monthly attendance.",
  },
  {
    question: "How does the salary payment process work?",
    answer:
      "First, HR processes the employee’s salary and pays via the integrated Stripe payment system. Then Admin approves the payment. Once approved, the employee can see it in their Payment History.",
  },
  {
    question: "Can an employee view their own payment history?",
    answer:
      "Yes. Each employee has their own dashboard where they can check Payment History, Task Submissions, and Work Progress.",
  },
  {
    question: "How can an employee be terminated from the system?",
    answer:
      "Only Admin has the authority to fire an employee. From the Admin dashboard, the Admin can select an employee and use the 'Fire Employee' option.",
  },
  {
    question: "Does the system support role-based access?",
    answer:
      "Yes. The system has three roles – Admin, HR, and Employee. Each role comes with its own dedicated dashboard and specific permissions.",
  },
];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center dark:text-gray-400 mb-8">
        ❓ Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border dark:text-gray-400 rounded-2xl shadow-md bg-white overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex dark:text-gray-500 justify-between items-center px-6 py-4 text-left font-medium text-lg"
            >
              {faq.question}
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
