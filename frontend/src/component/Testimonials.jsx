import React, { useEffect, useState } from "react";

import { testimonialsImg } from "../assets/image.js";

const Testimonials = () => {
  const [testimg1, setTestImg1] = useState(0);
  const [testimg2, setTestImg2] = useState(0);
 


  setInterval(() => {
    let randomOne = Math.floor(Math.random() * 2);
    let randomTwo = Math.floor(Math.random() * 2);
    setTestImg1(randomOne);
    setTestImg2(randomTwo);
    
  }, 10000);


  return (
    <div className="text-center">
      <h2 className="pt-12 text-4xl font-bold">
                  <i>Testimonials from customers who recommend Rive</i>
              </h2><div className=" flex justify-center items-center flex-wrap gap-25 pb-3 mt-8 gap-box">
                      <div className="w-[35rem] flex test-box rounded-2xl p-4 shadow-2xl">
                          <figure className="w-[150px] h-[200px] rounded-2xl overflow-hidden">
                              <img src={testimonialsImg.slice(0,2)[testimg1].img} alt="" className="w-full h-full object-cover" />
                          </figure>
                          <div className="w-[400px] flex flex-col gap-9 width-phone">
                              <h3 className="text-center">{testimonialsImg.slice(0,2)[testimg1].name}</h3>
                              <p>
                                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                  Doloremque, autem eos. Vitae aliquid excepturi eveniet!"
                              </p>
                              <h4 className="text-end center">{testimonialsImg.slice(0,2)[testimg1].location}</h4>
                          </div>
                      </div>
                      <div className="w-[35rem] flex test-box  rounded-2xl p-4 shadow-2xl">
                          <figure className="w-[150px] h-[200px] rounded-2xl overflow-hidden">
                              <img src={testimonialsImg.slice(2)[testimg2].img}  alt="" className="w-full h-full object-cover" />
                          </figure>
                          <div className="w-[400px] flex flex-col gap-9 width-phone">
                              <h3 className="text-center">{testimonialsImg.slice(2)[testimg2].name}</h3>

                              <p>
                                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                  Doloremque, autem eos. Vitae aliquid excepturi eveniet!"
                              </p>
                              <h4 className="text-end center">{testimonialsImg.slice(2)[testimg2].location}</h4>
                          </div>
                      </div>
                  </div>
                  

    </div>
  );
};

export default Testimonials;
