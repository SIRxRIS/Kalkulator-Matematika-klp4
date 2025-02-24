import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen w-full pattern-background relative">
      {/* Navigation bar */}
      <nav className="flex justify-between items-center px-6 py-4 relative z-20">
        <div className="text-white font-bold text-[32px] font-poppins ml-[150px]">
          Kelompok 4
        </div>
        <div className="text-white font-bold text-[32px] font-poppins mr-[150px]">
          Website Kalkulator
        </div>
      </nav>

      {/* Main content - Centered buttons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4 text-center">
        <Link href="/bangun-datar">
          <button
            className="inline-block px-8 py-3 font-bold text-[16px] text-white border border-white rounded-full 
                     hover:bg-[#8CBEFF] hover:border-[#8CBEFF] transition-all duration-1000
                     cursor-pointer"
          >
            Bangun Datar
          </button>
        </Link>
        <div className="h-2"></div> {/* Spacer */}
        <Link href="/bangun-ruang">
          <button
            className="inline-block px-8 py-3 font-bold text-[16px] text-white  border border-white rounded-full 
                     hover:bg-[#8CBEFF] hover:border-[#8CBEFF] transition-all duration-1000
                     cursor-pointer"
          >
            Bangun Ruang
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
