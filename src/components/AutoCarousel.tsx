"use client";
import React, { useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const AutoCarousel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseOver = useRef(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 10 },
  });

  const clearNextTimeout = () => {
    if (timeout.current) clearTimeout(timeout.current);
  };

  const nextTimeout = () => {
    clearNextTimeout();
    if (mouseOver.current || !slider.current) return;
    timeout.current = setTimeout(() => {
      slider.current?.next();
    }, 3000);
  };

  useEffect(() => {
    if (!slider.current || !containerRef.current) return;

    containerRef.current.addEventListener("mouseover", () => {
      mouseOver.current = true;
      clearNextTimeout();
    });

    containerRef.current.addEventListener("mouseout", () => {
      mouseOver.current = false;
      nextTimeout();
    });

    nextTimeout();
  }, [slider]);

  return (
    <div
      ref={(node) => {
        sliderRef(node);
        containerRef.current = node;
      }}
      className="keen-slider max-w-9/10 lg:max-w-4/5 max-h-auto mt-3 sm:mt-4 md:mt-6 mx-auto rounded-lg overflow-hidden shadow"
    >
      <div className="keen-slider__slide number-slide1 rounded-lg">
        <img src="/carousel/carousel1.png" className="w-full h-auto object-cover" />
      </div>
      <div className="keen-slider__slide number-slide2 rounded-lg">
        <img src="/carousel/carousel2.png" className="w-full h-auto object-cover" />
      </div>
      <div className="keen-slider__slide number-slide3 rounded-lg">
        <img src="/carousel/carousel3.png" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default AutoCarousel;
