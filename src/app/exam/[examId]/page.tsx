
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Triangle } from "react-loader-spinner";
import Link from "next/link";
import QuizApp from "@/components/quize/[quizeId]/page"; 

export default function Exam() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [PopupVisible, setPopupVisible] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const { examId } = useParams<{ examId: string }>();
  const [MenuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState(""); 

  const fetchExam = async () => {
    try {
      const response = await fetch(
        `https://exam.elevateegy.com/api/v1/exams?subject=${examId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${localStorage.getItem("Token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setExams(data.exams || []);
    } catch (err: any) {
      setError(err.message || "erorr.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
  }, [examId]);

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  const Menu = () => {
    setMenuVisible(!MenuVisible);
  };

  const openPopup = (examId: string) => {
    setSelectedExamId(examId);
    setPopupVisible(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Triangle
          height="80"
          width="80"
          color="rgba(68,97,242,1)"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  }

  if (error) return <div className="text-center mt-5">Error: {error}</div>;

  return (
    <div>
      <div>
        <div className="mobile-header align-items-center justify-content-between bg-primary">
          <div className="">
            <button onClick={Menu}>
              <i className="fa-solid fa-bars me-3 ms-3 Icon"></i>
            </button>
            <i className="fa-solid fa-magnifying-glass Icon"></i>
          </div>
          <div className="div">
            <img className="img mt-2 w-100" src="/img.png" alt="" />
          </div>
        </div>

        <div className={`pb-2 header ${MenuVisible ? 'visible' : ''}`}>
          <div className="mobile-header align-items-center justify-content-between">
            <div className="">
              <img className="mt-4 logo w-75" src="/Logo2.png" alt="" />
            </div>
            <div className="">
              <button className="close-btn me-5 mt-3 " onClick={Menu}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          </div>

          <ul className="mt-5 ms-3">
            <li className="mb-4">
              <Link href="/dashboard" className="font button">
                <i className="fa-solid fa-house me-2 icon"></i> Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/history" className="font button">
                <i className="fa-regular fa-clock me-2 icon"></i> Quiz History
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/logOut" className="font button">
                <i className="fa-solid fa-arrow-right-from-bracket me-2 icon"></i> Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex">
        <div className="p-4 display">
          <div className="mt-4">
            <img src="/Logo2.png" alt="" />
          </div>
          <ul className="margin">
            <li className="mt-5">
              <Link href="/dashboard" className="font">
                <i className="fa-solid fa-house me-2 icon"></i> Dashboard
              </Link>
            </li>
            <li className="mt-5">
              <Link href="/history" className="font">
                <i className="fa-regular fa-clock me-2 icon"></i> Quiz History
              </Link>
            </li>
            <li className="mt-5">
              <Link href="/logOut" className="font">
                <i className="fa-solid fa-arrow-right-from-bracket me-2 icon"></i> Log Out
              </Link>
            </li>
          </ul>
        </div>

        <div className="container">
          <div className="main-content">
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="form-control search-bar me-3 rounded-5 shadow pt-3 pb-3 border-0 ps-4"
                placeholder="Search Quiz"
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
              <button className="btn btn-primary width btn-sm rounded-4 pt-2 pb-2">Start Quiz</button>
              <img className="user-avatar mt-3" src="/img.png" alt="" />
            </div>

            <div className="quiz-section">
              <h5>Front-End Quiz</h5>
              <div>
                {filteredExams.length === 0 ? (
                  <p>No quizzes found.</p>
                ) : (
                  filteredExams.map((exam: any) => (
                    <div key={exam._id} className="quiz-item mt-4 d-flex justify-content-between align-items-center">
                      <div className="quiz-details">
                        <h6>{exam.title}</h6>
                        <p>{exam.numberOfQuestions} Questions</p>
                      </div>
                      <div className="text-center">
                        <p>{exam.duration} Minutes</p>
                        <button className="btn btn-primary rounded-5 ps-5 pe-5"
                          onClick={() => openPopup(exam._id)}>Star</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

      
          {PopupVisible && selectedExamId && (
            <div className="popup-overlay">
              <div className="popup-content ">
                <QuizApp quizeId={selectedExamId} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
