"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/common/button";
import styles from "@/common/common.module.css";
import HtmlQuiz from "./QuizPages/html";
import CssQuiz from "./QuizPages/css";
import JavascriptQuiz from "./QuizPages/javascript";
import AccessQuiz from "./QuizPages/accessibility";
import Navbar from "@/common/navbar";

const Home = () => {
  const [currentComponent, setCurrentComponent] = useState<'HTML' | 'CSS' | 'Javascript' | 'Accessibility' | null>(null);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'HTML':
        return <HtmlQuiz />
      case 'CSS':
        return <CssQuiz />
      case 'Javascript':
        return <JavascriptQuiz />
      case 'Accessibility':
        return <AccessQuiz />
      default:
        return (
          <div>
            <p className="max-w-[465px] w-full font-[300] text-[64px] text-[#313E51]">
              Welcome to the <span className="font-[500] text-[#313E51]">Frontend Quiz!</span>
            </p>
            <p className="italic text-[20px] font-[400] text-[#626C7F]">
              Pick a subject to get started.
            </p>
          </div>
        );
    }
  };

  const storeQuizfromLocalStorage = useCallback((quiz: string | null) => {
    if (quiz) {
      localStorage.setItem('quiz', quiz);
    } else {
      localStorage.removeItem('quiz');
    }
  }, [])

  const getQuizfromLocalStorage = useCallback(() => {
    const storedQuiz = localStorage.getItem('quiz')
    if (storedQuiz) {
      setCurrentComponent(storedQuiz as 'HTML' | 'CSS' | 'Javascript' | 'Accessibility');
    }
  }, [])

  useEffect(() => {
    storeQuizfromLocalStorage(currentComponent)
  }, [currentComponent, storeQuizfromLocalStorage])

  useEffect(() => {
    getQuizfromLocalStorage()
  }, [getQuizfromLocalStorage])

  return (
    <main className="grid place-items-center min-h-screen">
      <div className={styles.quiz_ctn}>
        {/* <Navbar /> */}

        <div className={styles.home_quiz_ctn}>
          {renderComponent()}
          {!currentComponent && (
            <div className="flex flex-col gap-6 w-[564px]">
              <Button
                text="HTML"
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M24.5075 7.60749C24.6576 7.67412 24.793 7.76966 24.9062 7.88865C25.0193 8.00763 25.1078 8.14774 25.1668 8.30096C25.2258 8.45418 25.254 8.61752 25.2498 8.78164C25.2457 8.94577 25.2092 9.10746 25.1425 9.25749L15.1425 31.7575C15.0079 32.0605 14.7585 32.2976 14.449 32.4167C14.1396 32.5358 13.7955 32.5271 13.4925 32.3925C13.1895 32.2579 12.9524 32.0084 12.8333 31.699C12.7142 31.3896 12.7229 31.0455 12.8575 30.7425L22.8575 8.24249C22.9242 8.09245 23.0197 7.95699 23.1387 7.84387C23.2577 7.73075 23.3978 7.64218 23.551 7.58321C23.7042 7.52424 23.8676 7.49604 24.0317 7.5002C24.1958 7.50437 24.3575 7.54083 24.5075 7.60749ZM10.8325 13.44C10.955 13.5493 11.0547 13.6817 11.126 13.8296C11.1973 13.9774 11.2388 14.1379 11.2481 14.3018C11.2574 14.4657 11.2343 14.6298 11.1801 14.7848C11.126 14.9397 11.0419 15.0825 10.9325 15.205L6.67503 20L10.9375 24.795C11.0465 24.9178 11.1303 25.0608 11.184 25.216C11.2377 25.3711 11.2603 25.5353 11.2506 25.6992C11.2408 25.8631 11.1989 26.0235 11.1272 26.1712C11.0554 26.3189 10.9553 26.451 10.8325 26.56C10.7097 26.669 10.5667 26.7527 10.4115 26.8064C10.2564 26.8602 10.0922 26.8828 9.92829 26.873C9.76439 26.8633 9.60402 26.8214 9.45633 26.7496C9.30864 26.6779 9.17653 26.5778 9.06753 26.455L4.06753 20.83C3.86439 20.6012 3.7522 20.3059 3.7522 20C3.7522 19.6941 3.86439 19.3988 4.06753 19.17L9.06753 13.545C9.17651 13.4222 9.30862 13.322 9.45631 13.2503C9.604 13.1785 9.76437 13.1366 9.92828 13.1268C10.0922 13.1171 10.2564 13.1397 10.4116 13.1935C10.5667 13.2472 10.7098 13.331 10.8325 13.44ZM29.17 13.44C29.2928 13.331 29.4359 13.2472 29.591 13.1935C29.7462 13.1397 29.9104 13.1171 30.0743 13.1268C30.2382 13.1366 30.3986 13.1785 30.5463 13.2503C30.6939 13.322 30.8261 13.4222 30.935 13.545L35.935 19.17C36.1382 19.3988 36.2504 19.6941 36.2504 20C36.2504 20.3059 36.1382 20.6012 35.935 20.83L30.935 26.455C30.826 26.5778 30.6939 26.6779 30.5462 26.7496C30.3985 26.8214 30.2382 26.8633 30.0743 26.873C29.9104 26.8828 29.7462 26.8602 29.591 26.8064C29.4359 26.7527 29.2928 26.669 29.17 26.56C29.0472 26.451 28.9471 26.3189 28.8754 26.1712C28.8037 26.0235 28.7617 25.8631 28.752 25.6992C28.7422 25.5353 28.7649 25.3711 28.8186 25.216C28.8723 25.0608 28.956 24.9178 29.065 24.795L33.3275 20L29.065 15.205C28.956 15.0822 28.8722 14.9392 28.8185 14.784C28.7648 14.6289 28.7421 14.4646 28.7519 14.3007C28.7616 14.1368 28.8036 13.9765 28.8753 13.8288C28.9471 13.6811 29.0472 13.549 29.17 13.44Z" fill="#FF7E35" />
                </svg>}
                svgBgColor="#FFF1E9"
                onClick={() => setCurrentComponent('HTML')}
              />
              <Button
                text="CSS"
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M10 2.505C9.66848 2.505 9.35054 2.63669 9.11612 2.87111C8.8817 3.10553 8.75 3.42348 8.75 3.755V21.25C8.75 22.5761 9.27678 23.8478 10.2145 24.7855C11.1521 25.7232 12.4239 26.25 13.75 26.25H15V32.5C15 33.1563 15.1293 33.8061 15.3804 34.4125C15.6316 35.0188 15.9997 35.5697 16.4637 36.0338C16.9278 36.4978 17.4787 36.8659 18.085 37.1171C18.6914 37.3682 19.3412 37.4975 19.9975 37.4975C20.6538 37.4975 21.3036 37.3682 21.91 37.1171C22.5163 36.8659 23.0672 36.4978 23.5313 36.0338C23.9953 35.5697 24.3634 35.0188 24.6146 34.4125C24.8657 33.8061 24.995 33.1563 24.995 32.5V26.25H26.25C27.5761 26.25 28.8479 25.7232 29.7855 24.7855C30.7232 23.8478 31.25 22.5761 31.25 21.25V3.755C31.25 3.42348 31.1183 3.10553 30.8839 2.87111C30.6495 2.63669 30.3315 2.505 30 2.505H10ZM28.75 17.5H11.25V5.005H18.75V8.76C18.75 9.09152 18.8817 9.40946 19.1161 9.64388C19.3505 9.8783 19.6685 10.01 20 10.01C20.3315 10.01 20.6495 9.8783 20.8839 9.64388C21.1183 9.40946 21.25 9.09152 21.25 8.76V5.005H23.75V11.245C23.75 11.5765 23.8817 11.8945 24.1161 12.1289C24.3505 12.3633 24.6685 12.495 25 12.495C25.3315 12.495 25.6495 12.3633 25.8839 12.1289C26.1183 11.8945 26.25 11.5765 26.25 11.245V5.005H28.75V17.5ZM11.25 21.25V20H28.75V21.25C28.75 21.913 28.4866 22.5489 28.0178 23.0178C27.5489 23.4866 26.913 23.75 26.25 23.75H23.745C23.4135 23.75 23.0955 23.8817 22.8611 24.1161C22.6267 24.3505 22.495 24.6685 22.495 25V32.5C22.495 33.1624 22.2319 33.7976 21.7635 34.266C21.2951 34.7344 20.6599 34.9975 19.9975 34.9975C19.3351 34.9975 18.6999 34.7344 18.2315 34.266C17.7631 33.7976 17.5 33.1624 17.5 32.5V25C17.5 24.6685 17.3683 24.3505 17.1339 24.1161C16.8995 23.8817 16.5815 23.75 16.25 23.75H13.75C13.087 23.75 12.4511 23.4866 11.9822 23.0178C11.5134 22.5489 11.25 21.913 11.25 21.25Z" fill="#2FD887" />
                </svg>}
                svgBgColor="#E0FDEF"
                onClick={() => setCurrentComponent('CSS')}
              />
              <Button
                text="Javascript"
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M21.25 18.75C21.25 17.7554 21.6451 16.8016 22.3483 16.0983C23.0516 15.3951 24.0054 15 25 15H28.75C29.0815 15 29.3995 15.1317 29.6339 15.3661C29.8683 15.6005 30 15.9185 30 16.25C30 16.5815 29.8683 16.8995 29.6339 17.1339C29.3995 17.3683 29.0815 17.5 28.75 17.5H25C24.6685 17.5 24.3505 17.6317 24.1161 17.8661C23.8817 18.1005 23.75 18.4185 23.75 18.75V20C23.75 20.3315 23.8817 20.6495 24.1161 20.8839C24.3505 21.1183 24.6685 21.25 25 21.25H26.25C27.2446 21.25 28.1984 21.6451 28.9017 22.3483C29.6049 23.0516 30 24.0054 30 25V26.25C30 27.2446 29.6049 28.1984 28.9017 28.9017C28.1984 29.6049 27.2446 30 26.25 30H22.5C22.1685 30 21.8505 29.8683 21.6161 29.6339C21.3817 29.3995 21.25 29.0815 21.25 28.75C21.25 28.4185 21.3817 28.1005 21.6161 27.8661C21.8505 27.6317 22.1685 27.5 22.5 27.5H26.25C26.5815 27.5 26.8995 27.3683 27.1339 27.1339C27.3683 26.8995 27.5 26.5815 27.5 26.25V25C27.5 24.6685 27.3683 24.3505 27.1339 24.1161C26.8995 23.8817 26.5815 23.75 26.25 23.75H25C24.0054 23.75 23.0516 23.3549 22.3483 22.6517C21.6451 21.9484 21.25 20.9946 21.25 20V18.75ZM20 16.25C20 15.9185 19.8683 15.6005 19.6339 15.3661C19.3995 15.1317 19.0815 15 18.75 15C18.4185 15 18.1005 15.1317 17.8661 15.3661C17.6317 15.6005 17.5 15.9185 17.5 16.25V26.25C17.5 26.5815 17.3683 26.8995 17.1339 27.1339C16.8995 27.3683 16.5815 27.5 16.25 27.5H13.75C13.4185 27.5 13.1005 27.6317 12.8661 27.8661C12.6317 28.1005 12.5 28.4185 12.5 28.75C12.5 29.0815 12.6317 29.3995 12.8661 29.6339C13.1005 29.8683 13.4185 30 13.75 30H16.25C17.2446 30 18.1984 29.6049 18.9017 28.9017C19.6049 28.1984 20 27.2446 20 26.25V16.25ZM5 11.25C5 9.5924 5.65848 8.00269 6.83058 6.83058C8.00269 5.65848 9.5924 5 11.25 5H28.75C30.4076 5 31.9973 5.65848 33.1694 6.83058C34.3415 8.00269 35 9.5924 35 11.25V28.75C35 30.4076 34.3415 31.9973 33.1694 33.1694C31.9973 34.3415 30.4076 35 28.75 35H11.25C9.5924 35 8.00269 34.3415 6.83058 33.1694C5.65848 31.9973 5 30.4076 5 28.75V11.25ZM11.25 7.5C10.2554 7.5 9.30161 7.89509 8.59835 8.59835C7.89509 9.30161 7.5 10.2554 7.5 11.25V28.75C7.5 29.7446 7.89509 30.6984 8.59835 31.4017C9.30161 32.1049 10.2554 32.5 11.25 32.5H28.75C29.7446 32.5 30.6984 32.1049 31.4017 31.4017C32.1049 30.6984 32.5 29.7446 32.5 28.75V11.25C32.5 10.2554 32.1049 9.30161 31.4017 8.59835C30.6984 7.89509 29.7446 7.5 28.75 7.5H11.25Z" fill="#306AFF" />
                </svg>}
                svgBgColor="#EBF0FF"
                onClick={() => setCurrentComponent('Javascript')}
              />
              <Button
                text="Accessibility"
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M16.875 8.125C16.875 7.2962 17.2043 6.50134 17.7903 5.91529C18.3764 5.32924 19.1712 5 20 5C20.8288 5 21.6237 5.32924 22.2097 5.91529C22.7958 6.50134 23.125 7.2962 23.125 8.125C23.125 8.9538 22.7958 9.74866 22.2097 10.3347C21.6237 10.9208 20.8288 11.25 20 11.25C19.1712 11.25 18.3764 10.9208 17.7903 10.3347C17.2043 9.74866 16.875 8.9538 16.875 8.125ZM20 2.5C19.1517 2.50001 18.3143 2.69192 17.5506 3.06135C16.7869 3.43079 16.1167 3.96818 15.59 4.6333C15.0634 5.29843 14.6941 6.07405 14.5097 6.90212C14.3252 7.73019 14.3305 8.58925 14.525 9.415L10.495 7.79C9.51723 7.3962 8.42351 7.40429 7.45164 7.81251C6.47978 8.22073 5.70833 8.99608 5.30503 9.97C5.10541 10.4523 5.00335 10.9694 5.00478 11.4914C5.0062 12.0134 5.11106 12.5299 5.31331 13.0111C5.51556 13.4923 5.81118 13.9286 6.18308 14.2949C6.55498 14.6612 6.99579 14.9501 7.48003 15.145L12.5 17.1725V23.1325L7.96753 31.6575C7.72212 32.1188 7.56997 32.6239 7.51976 33.1439C7.46956 33.664 7.52228 34.1889 7.67491 34.6886C7.82755 35.1883 8.07711 35.653 8.40936 36.0562C8.7416 36.4595 9.15001 36.7933 9.61128 37.0388C10.5429 37.5344 11.6332 37.6396 12.6423 37.3314C13.6515 37.0231 14.4969 36.3266 14.9925 35.395L20 25.975L25.01 35.395C25.5053 36.3266 26.3504 37.0232 27.3593 37.3317C28.3683 37.6402 29.4585 37.5353 30.39 37.04C31.3216 36.5447 32.0183 35.6996 32.3268 34.6907C32.6353 33.6817 32.5303 32.5916 32.035 31.66L27.5 23.13V17.1725L32.52 15.145C33.0043 14.9501 33.4451 14.6612 33.817 14.2949C34.1889 13.9286 34.4845 13.4923 34.6868 13.0111C34.889 12.5299 34.9939 12.0134 34.9953 11.4914C34.9967 10.9694 34.8947 10.4523 34.695 9.97C34.2922 8.99563 33.521 8.21971 32.549 7.811C31.5771 7.40229 30.4831 7.39384 29.505 7.7875L25.4775 9.415C25.6721 8.58905 25.6773 7.72977 25.4928 6.90151C25.3082 6.07326 24.9386 5.29749 24.4117 4.63232C23.8848 3.96715 23.2143 3.42981 22.4503 3.06054C21.6863 2.69126 20.8486 2.49964 20 2.5ZM7.61753 10.9225C7.7688 10.5588 8.05705 10.2692 8.42003 10.1163C8.78301 9.9633 9.19159 9.95926 9.55753 10.105L18.1275 13.5675C19.3287 14.0527 20.6713 14.0527 21.8725 13.5675L30.4425 10.105C30.8085 9.95926 31.217 9.9633 31.58 10.1163C31.943 10.2692 32.2313 10.5588 32.3825 10.9225C32.4566 11.0999 32.4946 11.2903 32.4944 11.4826C32.4942 11.6749 32.4558 11.8652 32.3813 12.0425C32.3069 12.2198 32.1979 12.3805 32.0608 12.5152C31.9236 12.65 31.7611 12.7561 31.5825 12.8275L26.5625 14.8525C26.1001 15.0396 25.7042 15.3607 25.4258 15.7746C25.1473 16.1885 24.999 16.6762 25 17.175V23.1325C24.9998 23.5422 25.1002 23.9457 25.2925 24.3075L29.8275 32.835C29.9915 33.179 30.0165 33.573 29.8972 33.935C29.7779 34.297 29.5236 34.5989 29.1872 34.7781C28.8508 34.9572 28.4583 34.9997 28.0914 34.8967C27.7245 34.7937 27.4115 34.5531 27.2175 34.225L22.2075 24.8C21.9946 24.3994 21.6766 24.0643 21.2877 23.8306C20.8989 23.5969 20.4537 23.4734 20 23.4734C19.5463 23.4734 19.1012 23.5969 18.7123 23.8306C18.3234 24.0643 18.0055 24.3994 17.7925 24.8L12.785 34.2175C12.6939 34.3889 12.57 34.5406 12.4202 34.6641C12.2705 34.7876 12.0979 34.8803 11.9123 34.9371C11.7267 34.9938 11.5317 35.0135 11.3385 34.9949C11.1453 34.9763 10.9577 34.9199 10.7863 34.8288C10.6149 34.7376 10.4632 34.6137 10.3397 34.4639C10.2162 34.3142 10.1235 34.1416 10.0667 33.956C10.0099 33.7704 9.99029 33.5754 10.0089 33.3822C10.0275 33.189 10.0839 33.0014 10.175 32.83L14.7075 24.305C14.8994 23.944 14.9999 23.5414 15 23.1325V17.1725C15 16.6745 14.8513 16.1879 14.5729 15.775C14.2945 15.3621 13.8992 15.0417 13.4375 14.855L8.41753 12.825C8.23899 12.7536 8.07642 12.6475 7.93928 12.5127C7.80215 12.378 7.69319 12.2173 7.61874 12.04C7.54429 11.8627 7.50585 11.6724 7.50564 11.4801C7.50543 11.2878 7.54347 11.0999 7.61753 10.9225Z" fill="#A729F5" />
                </svg>}
                svgBgColor="#EFEFFF"
                onClick={() => setCurrentComponent('Accessibility')}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

