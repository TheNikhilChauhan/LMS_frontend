import React from "react";

function CarouselSlide({ image, title, quote, slideNumber, totalSlides }) {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
      <div className="flex flex-col items-center justify-center px-[15%] gap-4">
        <img src={image} className="w-full rounded-full" />
        <p className="text-xl text-gray-200">{quote}</p>
        <h3 className="text-2xl font-semibold">{title} </h3>
        <div className="absolute flex justify-between transform -translate-y-1/2   top-[50%] left-5 right-5">
          <a
            href={`#slide${slideNumber === 1 ? totalSlides : slideNumber - 1}`}
            className="btn btn-circle"
          >
            ❮
          </a>
          <a
            href={`#slide${(slideNumber % totalSlides) + +1}`}
            className="btn btn-circle"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}

export default CarouselSlide;
