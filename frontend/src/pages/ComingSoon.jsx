import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 120,
    hours: 60,
    minutes: 12,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-auto bg-green-700 text-white font-merriweather text-center px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          We Are <span className="text-yellow-400">Coming</span> Soon
        </h1>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex flex-col items-center justify-center bg-yellow-400 rounded-lg text-white shadow-lg p-2"
            >
              <p className="text-xs md:text-sm font-semibold capitalize">{label}</p>
              <p className="text-xl md:text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="w-3/4 md:w-1/2 border-t border-gray-300 my-6"></div>

        
        <div className="w-full max-w-md px-4">
          <p className="mb-2 text-sm md:text-base text-gray-200 text-center">
            Subscribe for the latest news
          </p>
          <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg overflow-hidden shadow-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-black focus:outline-none text-sm md:text-base border-none"
            />
            <button className="bg-yellow-400 text-black px-5 py-3 hover:bg-yellow-500 transition w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
