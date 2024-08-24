"use client"

import React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  text: string;
  svg: React.ReactNode;
  svgBgColor: string;
}

const Button: React.FC<ButtonProps> = ({ text, svg, svgBgColor }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/Quiz')
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-8 text-[28px] font-[500] p-5 rounded-[24px] shadow-custom bg-[#fff]"
    >
      <div className={`rounded-[8px] bg-[${svgBgColor}] p-1`}>
        {svg}
      </div>
      {text}
    </button>
  )
}

export default Button;