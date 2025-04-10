import React from "react";

const HeroPageImages = ({ image,index}) => {
  return (
    <figure className={`min-w-[200px] h-[300px] ${index > 0 ? "hide" : ""}`}>
      <img src={image.img} alt="" className="w-full h-[300px] rounded-t-4xl" />
    </figure>
  );
};

export default HeroPageImages;
