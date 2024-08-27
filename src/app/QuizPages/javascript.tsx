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

const JavascriptQuiz = () => {
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

      const javascriptQuestions = data.filter(
        (quiz) => quiz.title === "JavaScript"
      );
      return javascriptQuestions;
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
          text="Javascript"
          svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M21.25 18.75C21.25 17.7554 21.6451 16.8016 22.3483 16.0983C23.0516 15.3951 24.0054 15 25 15H28.75C29.0815 15 29.3995 15.1317 29.6339 15.3661C29.8683 15.6005 30 15.9185 30 16.25C30 16.5815 29.8683 16.8995 29.6339 17.1339C29.3995 17.3683 29.0815 17.5 28.75 17.5H25C24.6685 17.5 24.3505 17.6317 24.1161 17.8661C23.8817 18.1005 23.75 18.4185 23.75 18.75V20C23.75 20.3315 23.8817 20.6495 24.1161 20.8839C24.3505 21.1183 24.6685 21.25 25 21.25H26.25C27.2446 21.25 28.1984 21.6451 28.9017 22.3483C29.6049 23.0516 30 24.0054 30 25V26.25C30 27.2446 29.6049 28.1984 28.9017 28.9017C28.1984 29.6049 27.2446 30 26.25 30H22.5C22.1685 30 21.8505 29.8683 21.6161 29.6339C21.3817 29.3995 21.25 29.0815 21.25 28.75C21.25 28.4185 21.3817 28.1005 21.6161 27.8661C21.8505 27.6317 22.1685 27.5 22.5 27.5H26.25C26.5815 27.5 26.8995 27.3683 27.1339 27.1339C27.3683 26.8995 27.5 26.5815 27.5 26.25V25C27.5 24.6685 27.3683 24.3505 27.1339 24.1161C26.8995 23.8817 26.5815 23.75 26.25 23.75H25C24.0054 23.75 23.0516 23.3549 22.3483 22.6517C21.6451 21.9484 21.25 20.9946 21.25 20V18.75ZM20 16.25C20 15.9185 19.8683 15.6005 19.6339 15.3661C19.3995 15.1317 19.0815 15 18.75 15C18.4185 15 18.1005 15.1317 17.8661 15.3661C17.6317 15.6005 17.5 15.9185 17.5 16.25V26.25C17.5 26.5815 17.3683 26.8995 17.1339 27.1339C16.8995 27.3683 16.5815 27.5 16.25 27.5H13.75C13.4185 27.5 13.1005 27.6317 12.8661 27.8661C12.6317 28.1005 12.5 28.4185 12.5 28.75C12.5 29.0815 12.6317 29.3995 12.8661 29.6339C13.1005 29.8683 13.4185 30 13.75 30H16.25C17.2446 30 18.1984 29.6049 18.9017 28.9017C19.6049 28.1984 20 27.2446 20 26.25V16.25ZM5 11.25C5 9.5924 5.65848 8.00269 6.83058 6.83058C8.00269 5.65848 9.5924 5 11.25 5H28.75C30.4076 5 31.9973 5.65848 33.1694 6.83058C34.3415 8.00269 35 9.5924 35 11.25V28.75C35 30.4076 34.3415 31.9973 33.1694 33.1694C31.9973 34.3415 30.4076 35 28.75 35H11.25C9.5924 35 8.00269 34.3415 6.83058 33.1694C5.65848 31.9973 5 30.4076 5 28.75V11.25ZM11.25 7.5C10.2554 7.5 9.30161 7.89509 8.59835 8.59835C7.89509 9.30161 7.5 10.2554 7.5 11.25V28.75C7.5 29.7446 7.89509 30.6984 8.59835 31.4017C9.30161 32.1049 10.2554 32.5 11.25 32.5H28.75C29.7446 32.5 30.6984 32.1049 31.4017 31.4017C32.1049 30.6984 32.5 29.7446 32.5 28.75V11.25C32.5 10.2554 32.1049 9.30161 31.4017 8.59835C30.6984 7.89509 29.7446 7.5 28.75 7.5H11.25Z" fill="#306AFF" />
          </svg>}
          svgBgColor="#EBF0FF"

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
                        <path d="M21.25 18.75C21.25 17.7554 21.6451 16.8016 22.3483 16.0983C23.0516 15.3951 24.0054 15 25 15H28.75C29.0815 15 29.3995 15.1317 29.6339 15.3661C29.8683 15.6005 30 15.9185 30 16.25C30 16.5815 29.8683 16.8995 29.6339 17.1339C29.3995 17.3683 29.0815 17.5 28.75 17.5H25C24.6685 17.5 24.3505 17.6317 24.1161 17.8661C23.8817 18.1005 23.75 18.4185 23.75 18.75V20C23.75 20.3315 23.8817 20.6495 24.1161 20.8839C24.3505 21.1183 24.6685 21.25 25 21.25H26.25C27.2446 21.25 28.1984 21.6451 28.9017 22.3483C29.6049 23.0516 30 24.0054 30 25V26.25C30 27.2446 29.6049 28.1984 28.9017 28.9017C28.1984 29.6049 27.2446 30 26.25 30H22.5C22.1685 30 21.8505 29.8683 21.6161 29.6339C21.3817 29.3995 21.25 29.0815 21.25 28.75C21.25 28.4185 21.3817 28.1005 21.6161 27.8661C21.8505 27.6317 22.1685 27.5 22.5 27.5H26.25C26.5815 27.5 26.8995 27.3683 27.1339 27.1339C27.3683 26.8995 27.5 26.5815 27.5 26.25V25C27.5 24.6685 27.3683 24.3505 27.1339 24.1161C26.8995 23.8817 26.5815 23.75 26.25 23.75H25C24.0054 23.75 23.0516 23.3549 22.3483 22.6517C21.6451 21.9484 21.25 20.9946 21.25 20V18.75ZM20 16.25C20 15.9185 19.8683 15.6005 19.6339 15.3661C19.3995 15.1317 19.0815 15 18.75 15C18.4185 15 18.1005 15.1317 17.8661 15.3661C17.6317 15.6005 17.5 15.9185 17.5 16.25V26.25C17.5 26.5815 17.3683 26.8995 17.1339 27.1339C16.8995 27.3683 16.5815 27.5 16.25 27.5H13.75C13.4185 27.5 13.1005 27.6317 12.8661 27.8661C12.6317 28.1005 12.5 28.4185 12.5 28.75C12.5 29.0815 12.6317 29.3995 12.8661 29.6339C13.1005 29.8683 13.4185 30 13.75 30H16.25C17.2446 30 18.1984 29.6049 18.9017 28.9017C19.6049 28.1984 20 27.2446 20 26.25V16.25ZM5 11.25C5 9.5924 5.65848 8.00269 6.83058 6.83058C8.00269 5.65848 9.5924 5 11.25 5H28.75C30.4076 5 31.9973 5.65848 33.1694 6.83058C34.3415 8.00269 35 9.5924 35 11.25V28.75C35 30.4076 34.3415 31.9973 33.1694 33.1694C31.9973 34.3415 30.4076 35 28.75 35H11.25C9.5924 35 8.00269 34.3415 6.83058 33.1694C5.65848 31.9973 5 30.4076 5 28.75V11.25ZM11.25 7.5C10.2554 7.5 9.30161 7.89509 8.59835 8.59835C7.89509 9.30161 7.5 10.2554 7.5 11.25V28.75C7.5 29.7446 7.89509 30.6984 8.59835 31.4017C9.30161 32.1049 10.2554 32.5 11.25 32.5H28.75C29.7446 32.5 30.6984 32.1049 31.4017 31.4017C32.1049 30.6984 32.5 29.7446 32.5 28.75V11.25C32.5 10.2554 32.1049 9.30161 31.4017 8.59835C30.6984 7.89509 29.7446 7.5 28.75 7.5H11.25Z" fill="#306AFF" />
                      </svg>
                    </div>
                    <p className="font-[500] text-[28px]">Javascript</p>
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

export default JavascriptQuiz;
