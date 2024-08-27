"use client";

import QuizButton from "@/common/quizButton"
import styles from "@/common/common.module.css";
import { useEffect, useState } from "react";
import Navbar from "@/common/navbar";

interface questionType {
  title: string;
  icon: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

const letters = ["A", "B", "C", "D"];

const CssQuiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<questionType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<(number | null)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleButtonClick = (index: number) => {
    const updatedClickedButton = [...clickedButton];
    updatedClickedButton[currentQuestionIndex] = index;
    setClickedButton(updatedClickedButton);
    setIsQuestionAnswered(true);
    setShowError(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error("No data");
      }
      const data: questionType[] = await response.json();

      const cssQuestions = data.filter(
        (quiz) => quiz.title === "CSS"
      );
      return cssQuestions;
    } catch (e) {
      setError("Failed to load quiz data...");
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const quest = await fetchData();
      if (quest) {
        setQuestions(quest);
      }
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);

  const currentQuestion = questions[0]?.questions[currentQuestionIndex];
  const currentClickedButton = clickedButton[currentQuestionIndex];
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)

  const handleNextQuestion = () => {
    if (clickedButton[currentQuestionIndex] !== null) {
      setIsQuestionAnswered(false)
      setShowError(false);

      if (currentQuestionIndex < (questions[0]?.questions.length || 1) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsQuizCompleted(true)
      }
    } else {
      setIsQuestionAnswered(true)
      setShowError(false);
    }
  };

  const handleNewQuiz = () => {
    window.location.href = '/'
  }

  if (isLoading) {
    return <div className={styles.loader}></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="grid place-items-center min-h-screen">
      <div className={styles.quiz_ctn}>
        <Navbar
          text="CSS"
          svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 2.505C9.66848 2.505 9.35054 2.63669 9.11612 2.87111C8.8817 3.10553 8.75 3.42348 8.75 3.755V21.25C8.75 22.5761 9.27678 23.8478 10.2145 24.7855C11.1521 25.7232 12.4239 26.25 13.75 26.25H15V32.5C15 33.1563 15.1293 33.8061 15.3804 34.4125C15.6316 35.0188 15.9997 35.5697 16.4637 36.0338C16.9278 36.4978 17.4787 36.8659 18.085 37.1171C18.6914 37.3682 19.3412 37.4975 19.9975 37.4975C20.6538 37.4975 21.3036 37.3682 21.91 37.1171C22.5163 36.8659 23.0672 36.4978 23.5313 36.0338C23.9953 35.5697 24.3634 35.0188 24.6146 34.4125C24.8657 33.8061 24.995 33.1563 24.995 32.5V26.25H26.25C27.5761 26.25 28.8479 25.7232 29.7855 24.7855C30.7232 23.8478 31.25 22.5761 31.25 21.25V3.755C31.25 3.42348 31.1183 3.10553 30.8839 2.87111C30.6495 2.63669 30.3315 2.505 30 2.505H10ZM28.75 17.5H11.25V5.005H18.75V8.76C18.75 9.09152 18.8817 9.40946 19.1161 9.64388C19.3505 9.8783 19.6685 10.01 20 10.01C20.3315 10.01 20.6495 9.8783 20.8839 9.64388C21.1183 9.40946 21.25 9.09152 21.25 8.76V5.005H23.75V11.245C23.75 11.5765 23.8817 11.8945 24.1161 12.1289C24.3505 12.3633 24.6685 12.495 25 12.495C25.3315 12.495 25.6495 12.3633 25.8839 12.1289C26.1183 11.8945 26.25 11.5765 26.25 11.245V5.005H28.75V17.5ZM11.25 21.25V20H28.75V21.25C28.75 21.913 28.4866 22.5489 28.0178 23.0178C27.5489 23.4866 26.913 23.75 26.25 23.75H23.745C23.4135 23.75 23.0955 23.8817 22.8611 24.1161C22.6267 24.3505 22.495 24.6685 22.495 25V32.5C22.495 33.1624 22.2319 33.7976 21.7635 34.266C21.2951 34.7344 20.6599 34.9975 19.9975 34.9975C19.3351 34.9975 18.6999 34.7344 18.2315 34.266C17.7631 33.7976 17.5 33.1624 17.5 32.5V25C17.5 24.6685 17.3683 24.3505 17.1339 24.1161C16.8995 23.8817 16.5815 23.75 16.25 23.75H13.75C13.087 23.75 12.4511 23.4866 11.9822 23.0178C11.5134 22.5489 11.25 21.913 11.25 21.25Z" fill="#2FD887" />
          </svg>}
          svgBgColor="#E0FDEF"
        />
        {currentQuestion && (
          <div key={currentQuestionIndex} className={styles.questions_ctn}>
            {isQuizCompleted ? (
              <div className="flex flex-col">
                <p className="max-w-[465px] w-full font-[300] text-[64px] text-[#313E51]">
                  Quiz completed <span className="font-[500] text-[#313E51]">You scored...</span>
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="italic font-[400] text-[20px] text-[#626C7F] mb-[27px]">
                  Question {currentQuestionIndex + 1} out of 10
                </p>
                <p className="max-w-[465px] w-full text-[36px] font-[500] text-[#313E51]">
                  {currentQuestion.question}
                </p>
                <span className="max-w-[465px] w-full h-4 bg-[#fff] p-1 rounded-full shadow-custom tb:mt-10">
                  <div
                    className={`${styles.progress_bar} h-full bg-[#A729F5] rounded-full`}
                    style={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}
                  ></div>
                </span>
              </div>
            )}

            {isQuizCompleted ? (
              <div className="flex flex-col gap-8 w-[564px]">
                <div className="flex flex-col p-12 bg-[#fff] shadow-custom rounded-[24px]">
                  <div className="flex items-center justify-center gap-6">
                    <div className={`${styles.svg} bg-[#FFF1E9]`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M10 2.505C9.66848 2.505 9.35054 2.63669 9.11612 2.87111C8.8817 3.10553 8.75 3.42348 8.75 3.755V21.25C8.75 22.5761 9.27678 23.8478 10.2145 24.7855C11.1521 25.7232 12.4239 26.25 13.75 26.25H15V32.5C15 33.1563 15.1293 33.8061 15.3804 34.4125C15.6316 35.0188 15.9997 35.5697 16.4637 36.0338C16.9278 36.4978 17.4787 36.8659 18.085 37.1171C18.6914 37.3682 19.3412 37.4975 19.9975 37.4975C20.6538 37.4975 21.3036 37.3682 21.91 37.1171C22.5163 36.8659 23.0672 36.4978 23.5313 36.0338C23.9953 35.5697 24.3634 35.0188 24.6146 34.4125C24.8657 33.8061 24.995 33.1563 24.995 32.5V26.25H26.25C27.5761 26.25 28.8479 25.7232 29.7855 24.7855C30.7232 23.8478 31.25 22.5761 31.25 21.25V3.755C31.25 3.42348 31.1183 3.10553 30.8839 2.87111C30.6495 2.63669 30.3315 2.505 30 2.505H10ZM28.75 17.5H11.25V5.005H18.75V8.76C18.75 9.09152 18.8817 9.40946 19.1161 9.64388C19.3505 9.8783 19.6685 10.01 20 10.01C20.3315 10.01 20.6495 9.8783 20.8839 9.64388C21.1183 9.40946 21.25 9.09152 21.25 8.76V5.005H23.75V11.245C23.75 11.5765 23.8817 11.8945 24.1161 12.1289C24.3505 12.3633 24.6685 12.495 25 12.495C25.3315 12.495 25.6495 12.3633 25.8839 12.1289C26.1183 11.8945 26.25 11.5765 26.25 11.245V5.005H28.75V17.5ZM11.25 21.25V20H28.75V21.25C28.75 21.913 28.4866 22.5489 28.0178 23.0178C27.5489 23.4866 26.913 23.75 26.25 23.75H23.745C23.4135 23.75 23.0955 23.8817 22.8611 24.1161C22.6267 24.3505 22.495 24.6685 22.495 25V32.5C22.495 33.1624 22.2319 33.7976 21.7635 34.266C21.2951 34.7344 20.6599 34.9975 19.9975 34.9975C19.3351 34.9975 18.6999 34.7344 18.2315 34.266C17.7631 33.7976 17.5 33.1624 17.5 32.5V25C17.5 24.6685 17.3683 24.3505 17.1339 24.1161C16.8995 23.8817 16.5815 23.75 16.25 23.75H13.75C13.087 23.75 12.4511 23.4866 11.9822 23.0178C11.5134 22.5489 11.25 21.913 11.25 21.25Z" fill="#2FD887" />
                      </svg>
                    </div>
                    <p className="font-[500] text-[28px]">CSS</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[144px] font-[500]">8</p>
                    <p className="text-[24px] font-[400] text-[#626C7F]">out of 10</p>
                  </div>
                </div>
                <button
                  onClick={handleNewQuiz}
                  disabled={!isQuestionAnswered}
                  className="mt-2 bg-[#A729F5] w-full text-[#fff] text-[28px] font-[500] p-5 rounded-[24px] shadow-custom outline-none hover:opacity-50"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <div className="w-[564px]">
                {currentQuestion.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-6 w-full">
                    <QuizButton
                      key={optionIndex}
                      text={option}
                      svg={letters[optionIndex]}
                      svgBgColor="#F4F6FA"
                      isClicked={currentClickedButton === optionIndex}
                      onClick={() => handleButtonClick(optionIndex)}
                    />
                  </div>
                ))}
                <button
                  onClick={handleNextQuestion}
                  disabled={!isQuestionAnswered}
                  className="mt-2 bg-[#A729F5] w-full text-[#fff] text-[28px] font-[500] p-5 rounded-[24px] shadow-custom outline-none hover:opacity-50"
                >
                  {currentQuestionIndex <
                    (questions[0]?.questions.length || 1) - 1
                    ? isQuestionAnswered
                      ? "Next Question"
                      : "Submit Answer"
                    : "Submit Answer"}
                </button>

                {showError && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M15 0C16.9698 -2.93527e-08 18.9204 0.387986 20.7403 1.14181C22.5601 1.89563 24.2137 3.00052 25.6066 4.3934C26.9995 5.78628 28.1044 7.43986 28.8582 9.25975C29.612 11.0796 30 13.0302 30 15C30 16.9698 29.612 18.9204 28.8582 20.7403C28.1044 22.5601 26.9995 24.2137 25.6066 25.6066C24.2137 26.9995 22.5601 28.1044 20.7403 28.8582C18.9204 29.612 16.9698 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 5.92805e-08 15 0ZM15 2.5C11.6848 2.5 8.50537 3.81696 6.16117 6.16117C3.81696 8.50537 2.5 11.6848 2.5 15C2.5 18.3152 3.81696 21.4946 6.16117 23.8388C8.50537 26.183 11.6848 27.5 15 27.5C18.3152 27.5 21.4946 26.183 23.8388 23.8388C26.183 21.4946 27.5 18.3152 27.5 15C27.5 11.6848 26.183 8.50537 23.8388 6.16117C21.4946 3.81696 18.3152 2.5 15 2.5ZM9.5975 9.915L9.74 9.74C9.94714 9.53331 10.2202 9.40584 10.5117 9.37981C10.8031 9.35377 11.0945 9.43081 11.335 9.5975L11.51 9.74L15 13.2325L18.49 9.74C18.6971 9.53331 18.9702 9.40584 19.2617 9.37981C19.5531 9.35377 19.8445 9.43081 20.085 9.5975L20.26 9.74C20.4667 9.94714 20.5942 10.2202 20.6202 10.5117C20.6462 10.8031 20.5692 11.0945 20.4025 11.335L20.26 11.51L16.7675 15L20.26 18.49C20.4667 18.6971 20.5942 18.9702 20.6202 19.2617C20.6462 19.5531 20.5692 19.8445 20.4025 20.085L20.26 20.26C20.0529 20.4667 19.7798 20.5942 19.4883 20.6202C19.1969 20.6462 18.9055 20.5692 18.665 20.4025L18.49 20.26L15 16.7675L11.51 20.26C11.3029 20.4667 11.0298 20.5942 10.7383 20.6202C10.4469 20.6462 10.1555 20.5692 9.915 20.4025L9.74 20.26C9.53331 20.0529 9.40584 19.7798 9.37981 19.4883C9.35377 19.1969 9.43081 18.9055 9.5975 18.665L9.74 18.49L13.2325 15L9.74 11.51C9.53331 11.3029 9.40584 11.0298 9.37981 10.7383C9.35377 10.4469 9.43081 10.1555 9.5975 9.915Z" fill="#EE5454" />
                    </svg>
                    <p className="text-[24px] font-[400] text-[#EE5454]">Please select an answer</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default CssQuiz;
