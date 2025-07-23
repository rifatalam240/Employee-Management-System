# 🚀 Employee Management System

A full-stack role-based employee management platform where Admin, HR, and Employee can manage work submissions, verify employees, make payments, and track progress with complete authorization, data security, and responsive UI.

---

## 🔐 Admin Credentials

- \*\*Admin Email:admin@admin.com
- \*\*Admin Password:admin1234Aa@#

---

## 🔗 Live Links

- 🌐 \*\*Live Site:https://employe-management-1c1ac.web.app/
- 💻 \*\*Client GitHub:https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-rifatalam240.git
- 🛠️ \*\*Server GitHub:https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-rifatalam240.git

---

## 🌟 Features

1. 🔐 Firebase Authentication with Email/Password and Google
2. 👥 Three Roles: Admin, HR, Employee with role-based dashboard access
3. 📋 Work Submission: Employees submit daily tasks with edit/delete options
4. 💳 HR Payroll System: HR can pay salaries of verified employees via modal + Stripe
5. 📊 Admin Payroll Approval: Admin approves salary via secure modal with date stamp
6. 📈 Salary vs Month Chart for employees (HR-only view)
7. 🔎 Progress Filtering: HR can filter work logs by employee & month
8. ✅ Verification System: HR can verify/unverify employees
9. 🔐 JWT Middleware: Secures all role-based backend API access
10. 📱 Fully Responsive: Supports Desktop, Tablet, Mobile view
11. 📝 Contact Us form: Anyone can send feedback, Admin can read it
12. 📤 Image Upload to imgbb for profile photos (no URL input)
13. 🔄 Client-side Routing with Private Route (no logout on refresh)
14. 📦 TanStack Query for all GET requests (data caching & auto refetch)
15. 🎉 Toast/SweetAlert2 for all CRUD and Auth notifications (no browser alerts)

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Tailwind, ShadCN/UI, TanStack Query, Firebase Auth, Stripe
- **Backend:** Express.js, MongoDB, Firebase Admin SDK, JWT (custom token middleware)
- **Others:** imgbb API (Image Upload), SweetAlert2, React-Hook-Form, TanStack Table

---

## 🧪 Testing Instructions

1. Register as **Employee** and submit work logs.
2. Register as **HR**, verify employees and pay salary.
3. Login as **Admin**, approve payment, promote/demote employees.
4. Try to access unauthorized pages directly (should redirect).
5. Try submitting payments twice for the same month (should block).
6. Test with different device sizes (responsive layout).
