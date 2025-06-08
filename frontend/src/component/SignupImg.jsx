import React from 'react'
import img1 from "../assets/images/img2.jpg";
import img2 from "../assets/images/img3.jpg";
import img3 from "../assets/images/img5.jpg";
import img4 from "../assets/images/img6.jpg";
const SignupImg = () => {
  return (
     <div className="h-full  justify-start  flex opacity-40">
        <img src={img1} alt="" className=" w-60 h-130 object-cover" />
        <img src={img2} alt="" className="w-60 h-150 object-cover" />
        <img src={img3} alt="" className=" w-60 h-170 object-cover" />
        <img src={img4} alt="" className=" w-60 h-190 object-cover" />
      </div>
  )
}

export default SignupImg