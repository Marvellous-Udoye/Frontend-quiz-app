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

const AccessQuiz = () => {
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

      const accesibilityQuestions = data.filter(
        (quiz) => quiz.title === "Accessibility"
      );
      return accesibilityQuestions;
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
          text="Accessibility"
          svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M16.875 8.125C16.875 7.2962 17.2043 6.50134 17.7903 5.91529C18.3764 5.32924 19.1712 5 20 5C20.8288 5 21.6237 5.32924 22.2097 5.91529C22.7958 6.50134 23.125 7.2962 23.125 8.125C23.125 8.9538 22.7958 9.74866 22.2097 10.3347C21.6237 10.9208 20.8288 11.25 20 11.25C19.1712 11.25 18.3764 10.9208 17.7903 10.3347C17.2043 9.74866 16.875 8.9538 16.875 8.125ZM20 2.5C19.1517 2.50001 18.3143 2.69192 17.5506 3.06135C16.7869 3.43079 16.1167 3.96818 15.59 4.6333C15.0634 5.29843 14.6941 6.07405 14.5097 6.90212C14.3252 7.73019 14.3305 8.58925 14.525 9.415L10.495 7.79C9.51723 7.3962 8.42351 7.40429 7.45164 7.81251C6.47978 8.22073 5.70833 8.99608 5.30503 9.97C5.10541 10.4523 5.00335 10.9694 5.00478 11.4914C5.0062 12.0134 5.11106 12.5299 5.31331 13.0111C5.51556 13.4923 5.81118 13.9286 6.18308 14.2949C6.55498 14.6612 6.99579 14.9501 7.48003 15.145L12.5 17.1725V23.1325L7.96753 31.6575C7.72212 32.1188 7.56997 32.6239 7.51976 33.1439C7.46956 33.664 7.52228 34.1889 7.67491 34.6886C7.82755 35.1883 8.07711 35.653 8.40936 36.0562C8.7416 36.4595 9.15001 36.7933 9.61128 37.0388C10.5429 37.5344 11.6332 37.6396 12.6423 37.3314C13.6515 37.0231 14.4969 36.3266 14.9925 35.395L20 25.975L25.01 35.395C25.5053 36.3266 26.3504 37.0232 27.3593 37.3317C28.3683 37.6402 29.4585 37.5353 30.39 37.04C31.3216 36.5447 32.0183 35.6996 32.3268 34.6907C32.6353 33.6817 32.5303 32.5916 32.035 31.66L27.5 23.13V17.1725L32.52 15.145C33.0043 14.9501 33.4451 14.6612 33.817 14.2949C34.1889 13.9286 34.4845 13.4923 34.6868 13.0111C34.889 12.5299 34.9939 12.0134 34.9953 11.4914C34.9967 10.9694 34.8947 10.4523 34.695 9.97C34.2922 8.99563 33.521 8.21971 32.549 7.811C31.5771 7.40229 30.4831 7.39384 29.505 7.7875L25.4775 9.415C25.6721 8.58905 25.6773 7.72977 25.4928 6.90151C25.3082 6.07326 24.9386 5.29749 24.4117 4.63232C23.8848 3.96715 23.2143 3.42981 22.4503 3.06054C21.6863 2.69126 20.8486 2.49964 20 2.5ZM7.61753 10.9225C7.7688 10.5588 8.05705 10.2692 8.42003 10.1163C8.78301 9.9633 9.19159 9.95926 9.55753 10.105L18.1275 13.5675C19.3287 14.0527 20.6713 14.0527 21.8725 13.5675L30.4425 10.105C30.8085 9.95926 31.217 9.9633 31.58 10.1163C31.943 10.2692 32.2313 10.5588 32.3825 10.9225C32.4566 11.0999 32.4946 11.2903 32.4944 11.4826C32.4942 11.6749 32.4558 11.8652 32.3813 12.0425C32.3069 12.2198 32.1979 12.3805 32.0608 12.5152C31.9236 12.65 31.7611 12.7561 31.5825 12.8275L26.5625 14.8525C26.1001 15.0396 25.7042 15.3607 25.4258 15.7746C25.1473 16.1885 24.999 16.6762 25 17.175V23.1325C24.9998 23.5422 25.1002 23.9457 25.2925 24.3075L29.8275 32.835C29.9915 33.179 30.0165 33.573 29.8972 33.935C29.7779 34.297 29.5236 34.5989 29.1872 34.7781C28.8508 34.9572 28.4583 34.9997 28.0914 34.8967C27.7245 34.7937 27.4115 34.5531 27.2175 34.225L22.2075 24.8C21.9946 24.3994 21.6766 24.0643 21.2877 23.8306C20.8989 23.5969 20.4537 23.4734 20 23.4734C19.5463 23.4734 19.1012 23.5969 18.7123 23.8306C18.3234 24.0643 18.0055 24.3994 17.7925 24.8L12.785 34.2175C12.6939 34.3889 12.57 34.5406 12.4202 34.6641C12.2705 34.7876 12.0979 34.8803 11.9123 34.9371C11.7267 34.9938 11.5317 35.0135 11.3385 34.9949C11.1453 34.9763 10.9577 34.9199 10.7863 34.8288C10.6149 34.7376 10.4632 34.6137 10.3397 34.4639C10.2162 34.3142 10.1235 34.1416 10.0667 33.956C10.0099 33.7704 9.99029 33.5754 10.0089 33.3822C10.0275 33.189 10.0839 33.0014 10.175 32.83L14.7075 24.305C14.8994 23.944 14.9999 23.5414 15 23.1325V17.1725C15 16.6745 14.8513 16.1879 14.5729 15.775C14.2945 15.3621 13.8992 15.0417 13.4375 14.855L8.41753 12.825C8.23899 12.7536 8.07642 12.6475 7.93928 12.5127C7.80215 12.378 7.69319 12.2173 7.61874 12.04C7.54429 11.8627 7.50585 11.6724 7.50564 11.4801C7.50543 11.2878 7.54347 11.0999 7.61753 10.9225Z" fill="#A729F5"/>
          </svg>}
          svgBgColor="#F6E7FF"

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

export default AccessQuiz;
