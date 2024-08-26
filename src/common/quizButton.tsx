import React, { useState } from "react";
import styles from "@/common/common.module.css";

interface ButtonProps {
    text: string;
    svg: React.ReactNode;
    svgBgColor: string;
    color?: string;
    isClicked: boolean;
    onClick?: () => void;
}

const QuizButton: React.FC<ButtonProps> = ({ text, svg, svgBgColor, color, isClicked, onClick }) => {
    const [hovered, setHovered] = useState(false);

    const backgroundColor = isClicked ? "#F6E7FF" : (hovered ? "#A729F5" : svgBgColor);
    const textColor = isClicked ? "#A729F5" : (hovered ? "#fff" : color);

    return (
        <button
            className={styles.quizButton}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <div
                className={styles.quizSvg}
                style={{ backgroundColor, color: textColor }}
            >
                {svg}
            </div>
            {text}
        </button>
    )
}

export default QuizButton;
