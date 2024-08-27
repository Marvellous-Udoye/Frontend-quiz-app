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

const HtmlQuiz = () => {
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

      const htmlQuestions = data.filter(
        (quiz) => quiz.title === "HTML"
      );
      return htmlQuestions;
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

  const handleNextQuestion = () => {
    if (clickedButton[currentQuestionIndex] !== null) {
      setIsQuestionAnswered(false)
      setShowError(false);

      if (currentQuestionIndex < (questions[0]?.questions.length || 1) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle form submission or final action
        alert("Submit your answers!");
      }
    } else {
      setIsQuestionAnswered(true)
      setShowError(false);
    }
  };

  const currentQuestion = questions[0]?.questions[currentQuestionIndex];
  const currentClickedButton = clickedButton[currentQuestionIndex];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="grid place-items-center min-h-screen">
      <div className={styles.quiz_ctn}>
        <Navbar
          text="HTML"
          svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M24.5075 7.60749C24.6576 7.67412 24.793 7.76966 24.9062 7.88865C25.0193 8.00763 25.1078 8.14774 25.1668 8.30096C25.2258 8.45418 25.254 8.61752 25.2498 8.78164C25.2457 8.94577 25.2092 9.10746 25.1425 9.25749L15.1425 31.7575C15.0079 32.0605 14.7585 32.2976 14.449 32.4167C14.1396 32.5358 13.7955 32.5271 13.4925 32.3925C13.1895 32.2579 12.9524 32.0084 12.8333 31.699C12.7142 31.3896 12.7229 31.0455 12.8575 30.7425L22.8575 8.24249C22.9242 8.09245 23.0197 7.95699 23.1387 7.84387C23.2577 7.73075 23.3978 7.64218 23.551 7.58321C23.7042 7.52424 23.8676 7.49604 24.0317 7.5002C24.1958 7.50437 24.3575 7.54083 24.5075 7.60749ZM10.8325 13.44C10.955 13.5493 11.0547 13.6817 11.126 13.8296C11.1973 13.9774 11.2388 14.1379 11.2481 14.3018C11.2574 14.4657 11.2343 14.6298 11.1801 14.7848C11.126 14.9397 11.0419 15.0825 10.9325 15.205L6.67503 20L10.9375 24.795C11.0465 24.9178 11.1303 25.0608 11.184 25.216C11.2377 25.3711 11.2603 25.5353 11.2506 25.6992C11.2408 25.8631 11.1989 26.0235 11.1272 26.1712C11.0554 26.3189 10.9553 26.451 10.8325 26.56C10.7097 26.669 10.5667 26.7527 10.4115 26.8064C10.2564 26.8602 10.0922 26.8828 9.92829 26.873C9.76439 26.8633 9.60402 26.8214 9.45633 26.7496C9.30864 26.6779 9.17653 26.5778 9.06753 26.455L4.06753 20.83C3.86439 20.6012 3.7522 20.3059 3.7522 20C3.7522 19.6941 3.86439 19.3988 4.06753 19.17L9.06753 13.545C9.17651 13.4222 9.30862 13.322 9.45631 13.2503C9.604 13.1785 9.76437 13.1366 9.92828 13.1268C10.0922 13.1171 10.2564 13.1397 10.4116 13.1935C10.5667 13.2472 10.7098 13.331 10.8325 13.44ZM29.17 13.44C29.2928 13.331 29.4359 13.2472 29.591 13.1935C29.7462 13.1397 29.9104 13.1171 30.0743 13.1268C30.2382 13.1366 30.3986 13.1785 30.5463 13.2503C30.6939 13.322 30.8261 13.4222 30.935 13.545L35.935 19.17C36.1382 19.3988 36.2504 19.6941 36.2504 20C36.2504 20.3059 36.1382 20.6012 35.935 20.83L30.935 26.455C30.826 26.5778 30.6939 26.6779 30.5462 26.7496C30.3985 26.8214 30.2382 26.8633 30.0743 26.873C29.9104 26.8828 29.7462 26.8602 29.591 26.8064C29.4359 26.7527 29.2928 26.669 29.17 26.56C29.0472 26.451 28.9471 26.3189 28.8754 26.1712C28.8037 26.0235 28.7617 25.8631 28.752 25.6992C28.7422 25.5353 28.7649 25.3711 28.8186 25.216C28.8723 25.0608 28.956 24.9178 29.065 24.795L33.3275 20L29.065 15.205C28.956 15.0822 28.8722 14.9392 28.8185 14.784C28.7648 14.6289 28.7421 14.4646 28.7519 14.3007C28.7616 14.1368 28.8036 13.9765 28.8753 13.8288C28.9471 13.6811 29.0472 13.549 29.17 13.44Z" fill="#FF7E35" />
          </svg>}
          svgBgColor="#FFF1E9"

        />
        {currentQuestion && (
          <div key={currentQuestionIndex} className={styles.questions_ctn}>
            <div className="flex flex-col gap-[27px]">
              <p className="italic font-[400] text-[20px] text-[#626C7F]">
                Question {currentQuestionIndex + 1} out of 10
              </p>
              <p className="max-w-[465px] w-full text-[36px] font-[500] text-[#313E51]">
                {currentQuestion.question}
              </p>
            </div>

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
                className="mt-2 mb-8 bg-[#A729F5] w-full text-[#fff] text-[28px] font-[500] p-5 rounded-[24px] shadow-custom outline-none hover:opacity-50"
              >
                {currentQuestionIndex <
                  (questions[0]?.questions.length || 1) - 1
                  ? isQuestionAnswered
                    ? "Next Question"
                    : "Submit Answer"
                  : "Play Again"}
              </button>

              {showError && (
                <div className="flex justify-center items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M15 0C16.9698 -2.93527e-08 18.9204 0.387986 20.7403 1.14181C22.5601 1.89563 24.2137 3.00052 25.6066 4.3934C26.9995 5.78628 28.1044 7.43986 28.8582 9.25975C29.612 11.0796 30 13.0302 30 15C30 16.9698 29.612 18.9204 28.8582 20.7403C28.1044 22.5601 26.9995 24.2137 25.6066 25.6066C24.2137 26.9995 22.5601 28.1044 20.7403 28.8582C18.9204 29.612 16.9698 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 5.92805e-08 15 0ZM15 2.5C11.6848 2.5 8.50537 3.81696 6.16117 6.16117C3.81696 8.50537 2.5 11.6848 2.5 15C2.5 18.3152 3.81696 21.4946 6.16117 23.8388C8.50537 26.183 11.6848 27.5 15 27.5C18.3152 27.5 21.4946 26.183 23.8388 23.8388C26.183 21.4946 27.5 18.3152 27.5 15C27.5 11.6848 26.183 8.50537 23.8388 6.16117C21.4946 3.81696 18.3152 2.5 15 2.5ZM9.5975 9.915L9.74 9.74C9.94714 9.53331 10.2202 9.40584 10.5117 9.37981C10.8031 9.35377 11.0945 9.43081 11.335 9.5975L11.51 9.74L15 13.2325L18.49 9.74C18.6971 9.53331 18.9702 9.40584 19.2617 9.37981C19.5531 9.35377 19.8445 9.43081 20.085 9.5975L20.26 9.74C20.4667 9.94714 20.5942 10.2202 20.6202 10.5117C20.6462 10.8031 20.5692 11.0945 20.4025 11.335L20.26 11.51L16.7675 15L20.26 18.49C20.4667 18.6971 20.5942 18.9702 20.6202 19.2617C20.6462 19.5531 20.5692 19.8445 20.4025 20.085L20.26 20.26C20.0529 20.4667 19.7798 20.5942 19.4883 20.6202C19.1969 20.6462 18.9055 20.5692 18.665 20.4025L18.49 20.26L15 16.7675L11.51 20.26C11.3029 20.4667 11.0298 20.5942 10.7383 20.6202C10.4469 20.6462 10.1555 20.5692 9.915 20.4025L9.74 20.26C9.53331 20.0529 9.40584 19.7798 9.37981 19.4883C9.35377 19.1969 9.43081 18.9055 9.5975 18.665L9.74 18.49L13.2325 15L9.74 11.51C9.53331 11.3029 9.40584 11.0298 9.37981 10.7383C9.35377 10.4469 9.43081 10.1555 9.5975 9.915Z" fill="#EE5454" />
                  </svg>
                  <p className="text-[24px] font-[400] text-[#EE5454]">Please select an answer</p>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HtmlQuiz;
