import { motion } from "framer-motion";
import {
  CalendarClock,
  Banknote,
  ShieldCheck,
  Users,
  BarChart3,
  CreditCard,
  ClipboardList,
  BadgeCheck,
} from "lucide-react";

// ✅ Drop-in Key Features section for your EMS Home Page
// - TailwindCSS for styling
// - framer-motion for subtle animations
// - lucide-react for crisp icons
// How to use: <KeyFeaturesSection /> anywhere on your Home page.
// Optional: pass a custom features array via props to override defaults.

const defaultFeatures = [
  {
    title: "Attendance Tracking",
    description:
      "Employees log daily work (task, date, hours). HR/Admin can view monthly hours and filter by employee & month.",
    icon: CalendarClock,
    tag: "Worksheet + Logs",
  },
  {
    title: "Salary & Payslip",
    description:
      "HR initiates salary, Admin approves. Auto-generated payslips & employee Payment History available.",
    icon: Banknote,
    tag: "Payroll Flow",
  },
  {
    title: "Role Management",
    description:
      "Dedicated dashboards & permissions for Admin, HR and Employee. Admin can make HR or fire users.",
    icon: Users,
    tag: "RBAC",
  },
  {
    title: "Progress Reports",
    description:
      "Visualize work progress with charts (e.g., Salary vs Month on details page) using live DB data.",
    icon: BarChart3,
    tag: "Analytics",
  },
  {
    title: "Secure Auth & JWT",
    description:
      "Email/Password auth + Google/GitHub. Backend validates roles via JWT/Firebase token middleware.",
    icon: ShieldCheck,
    tag: "Security",
  },
  {
    title: "Stripe Payments (No Double Pay)",
    description:
      "Gateway checkout with duplicate month/year prevention and instant UI updates in payroll table.",
    icon: CreditCard,
    tag: "Payments",
  },
  {
    title: "Verification Workflow",
    description:
      "HR toggles employee verification. Only verified employees are payable. Status syncs with DB.",
    icon: BadgeCheck,
    tag: "HR Control",
  },
  {
    title: "Smooth UX with React Query",
    description:
      "All GET requests via TanStack Query for caching, re-fetching & loading states. Toasts on CRUD.",
    icon: ClipboardList,
    tag: "Performance",
  },
];

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function KeyFeaturesSection({ features = defaultFeatures }) {
  return (
    <section className="relative py-16 sm:py-20 dark:bg-gray-900 ">
      {/* Background accent */}
      <div className="pointer-events-none absolute  inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-gray-400">
            Key Features
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to manage employees, payroll, and progress in one place.
          </p>
        </div>

        {/* Card Grid */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((f, idx) => (
            <motion.li key={idx} variants={item}>
              <FeatureCard {...f} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, icon: Icon, tag }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Soft gradient ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-slate-900/5 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start gap-4">
        <div className="rounded-xl border border-slate-200 p-3 shadow-sm">
          <Icon className="h-6 w-6 dark:text-gray-400" aria-hidden />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold dark:text-gray-400 leading-tight">{title}</h3>
            {tag && (
              <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600">
                {tag}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>

      {/* subtle bottom bar */}
      <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 opacity-70 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
