import React from "react";
import styles from "@/common/common.module.css";

interface ButtonProps {
  text: string;
  svg?: React.ReactNode;
  svgBgColor?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, svg, svgBgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}>
      <div
        className={styles.svg}
        style={{ backgroundColor: svgBgColor }}
      >
        {svg}
      </div>
      {text}
    </button>
  )
}

export default Button;