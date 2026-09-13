import React from 'react';
import profileImg from '../../assets/profile.png';

export default function HeroMedia() {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl h-[400px] lg:h-[600px] flex justify-end items-end">
      {/* FOREGROUND PROFILE IMAGE */}
      <img
        src={profileImg}
        alt="Paulo Gomes"
        className="w-full h-full object-contain object-bottom object-right z-20 grayscale-0 lg:grayscale hover:grayscale-0 transition-all duration-700 opacity-100 lg:opacity-90 hover:opacity-100"
      />
    </div>
  );
}
