import React, { useState } from 'react';
import videoSrc from '../../assets/transicao.mp4';
import profileImg from '../../assets/profile.png';

export default function HeroMedia() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-square lg:w-[480px] lg:h-[480px] rounded-2xl border border-gn-surface bg-gn-bg overflow-hidden shadow-2xl">
      {/* BACKGROUND VIDEO WITH FADE IN */}
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-30' : 'opacity-0'
        }`}
      />
      
      {/* GRADIENT MASK */}
      <div className="absolute inset-0 bg-gradient-to-t from-gn-bg via-transparent to-transparent z-10" />

      {/* FOREGROUND PROFILE IMAGE */}
      <img
        src={profileImg}
        alt="Paulo Gomes"
        className="absolute inset-0 w-full h-full object-cover object-top z-20 grayscale hover:grayscale-0 transition-all duration-700"
      />
    </div>
  );
}
