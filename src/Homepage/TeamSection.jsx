import React from "react";

const team = [
  {
    name: "Sharif Islam",
    role: "Full Stack Developer",
    photo:
      "https://i.postimg.cc/NF41Zj6h/Tips-to-Hire-Full-Stack-Developer-for-your-Web-and-Mobile-Project-inner.jpg",
  },
  {
    name: "Rebeka Sultana",
    role: "HR Executive",
    photo: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    name: "Rashid Khan",
    role: "Admin & Analyst",
    photo: "https://i.postimg.cc/FRnvpj6w/smile-office-laptop-business-man-260nw-2417739665.webp",
  },
  {
    name: "Tania Akter",
    role: "UI/UX Designer",
    photo: "https://i.postimg.cc/xjJ39LQC/Madina-Suleymanova-UX-UI-Designer-Cirrus-Assessment-1-1024x1024.webp",
  },
];

const TeamSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold dark:text-gray-400 text-[#063C4C] mb-12">
          Meet Our <span className="text-[#0a5a70]">Leadership Team</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#f8fafc] rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-[#0a5a70] mb-3"
              />
              <h3 className="text-lg font-semibold text-[#063C4C]">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
