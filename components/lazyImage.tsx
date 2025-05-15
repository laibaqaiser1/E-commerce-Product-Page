"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  src: string;
  blurSrc: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
  onLoad?: () => void;
  onError?: () => void;
};

export default function LazyImage({
  src,
  blurSrc,
  alt,
  className = "",
  fit = "cover",
  onLoad,
  onError,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

 
  useEffect(() => {
    setLoaded(false);
    setCurrentSrc(""); 

    const delayId = setTimeout(() => {
      setCurrentSrc(src);
    }, 300); 

    return () => clearTimeout(delayId);
  }, [src]);

  const handleLoad = () => {
    setTimeout(() => {
      setLoaded(true);
      onLoad?.();
    }, 500); 
  };

  const handleError = () => {
    setLoaded(true);
    onError?.();
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
     
      <Image
        src={blurSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`absolute inset-0 ${fitClass} blur-md scale-105 transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden="true"
        priority
      />

      {currentSrc && (
        <Image
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`transition-opacity duration-700 ${fitClass} ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
