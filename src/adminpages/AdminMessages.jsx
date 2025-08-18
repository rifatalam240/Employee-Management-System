import { useEffect, useState } from "react";
import useAxiossecure from "../coustomHook/useAxiossecure";
import { FaEnvelope, FaRegCalendarAlt, FaUser } from "react-icons/fa";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const axiosSecure = useAxiossecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosSecure.get("/admin/messages");
        setMessages(res.data);
      } catch (err) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [axiosSecure]);

  return (
    <div className= " p-4 min-h-[70vh]  bg-gradient-to-br from-[#f9fbfc] to-[#e3eaf2]">
      <div className="max-w-4xl mx-auto dark:bg-gray-900 h-[70vh]">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-gray-400 text-[#063C4C]">
          📥 Visitor Messages
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <FaEnvelope className="text-6xl text-gray-300 mb-4" />
            <p className="text-lg text-gray-500">No messages yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 dark:px-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2 border border-gray-100 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-[#0E5D6A]" />
                  <span className="font-semibold text-[#0E5D6A]">
                    {msg.email}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 break-words whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <FaRegCalendarAlt />
                  <span>
                    {msg.time
                      ? new Date(msg.time).toLocaleString()
                      : "No time info"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;

