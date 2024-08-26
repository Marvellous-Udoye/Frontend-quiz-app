"use client";

import QuizButton from "@/common/quizButton";
import styles from "@/common/common.module.css";
import { useEffect, useState } from "react";

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
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setClickedButton(index);
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
    if (currentQuestionIndex < (questions[0]?.questions.length || 1) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle form submission or final action
      alert("Submit your answers!");
    }
  };

  const currentQuestion = questions[0]?.questions[currentQuestionIndex];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="grid place-items-center min-h-screen">
      <div className={styles.quiz_ctn}>
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
                    isClicked={clickedButton === optionIndex}
                    onClick={() => handleButtonClick(optionIndex)}
                  />
                </div>
              ))}
              <button
                onClick={handleNextQuestion}
                className="mt-2 bg-[#A729F5] w-full text-[#fff] text-[28px] font-[500] p-5 rounded-[24px] shadow-custom outline-none hover:opacity-50"
              >
                {currentQuestionIndex < (questions[0]?.questions.length || 1) - 1
                  ? "Next Question"
                  : "Submit Answer"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HtmlQuiz;
