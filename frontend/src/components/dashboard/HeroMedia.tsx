import React from 'react';
import profileImg from '../../assets/profile.png';

export default function HeroMedia() {
  return (
    <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px]">
      {/* FOREGROUND PROFILE IMAGE */}
      <img
        src={profileImg}
        alt="Paulo Gomes"
        className="w-full h-full object-cover object-top z-20 grayscale hover:grayscale-0 transition-all duration-700 mix-blend-multiply opacity-90 hover:opacity-100"
      />
    </div>
  );
}
