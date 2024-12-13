
'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Triangle } from "react-loader-spinner";
import Link from "next/link";

export default function Exam() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { examId } = useParams<{ examId: string }>();
  const [isMenuVisible, setIsMenuVisible] = useState(false); 


  const fetchExam = async () => {
    try {
      const response = await fetch(`https://exam.elevateegy.com/api/v1/exams?subject=${examId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:`${localStorage.getItem("Token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setExams(data.exams || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
  }, [examId]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Triangle height="80" width="80" color="rgba(68,97,242,1)" ariaLabel="triangle-loading" />
      </div>
    );
  }

  if (error) return <div className="text-center mt-5">Error: {error}</div>;

  return (


    <div>
 
<div>

<div className=" mobile-header align-items-center justify-content-between bg-primary ">
    <div className="">
   <button onClick={toggleMenu}>
   <i className="fa-solid fa-bars me-3 ms-3 Icon"></i>
   </button>
   <i className="fa-solid fa-magnifying-glass Icon"></i>
    </div>
<div className="div">
      
<img className=" img mt-2 w-100 " src="/img.png" alt="" />
   
</div>

</div>

  <div className={`pb-2 header ${isMenuVisible ? 'visible' : ''}`}>
    
  <div className=" mobile-header align-items-center justify-content-between  ">
    <div className="">
  
    <img className="mt-4 logo w-75" src="/Logo2.png " alt="" />

    </div>
<div className="">
<button className="close-btn me-5 mt-3 " onClick={toggleMenu}>
          <i className="fa-solid fa-times"></i>
        </button>
       
   
</div>

</div>



  <ul className="mt-5 ms-3">
        <li className="mb-4  ">
          <Link href="/dashboard" className="font hover">
            <i className="fa-solid fa-house me-2 icon"></i> Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/history" className="font  hover">
            <i className="fa-regular fa-clock me-2 icon"></i> Quiz History
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/logOut" className="font hover">
            <i className="fa-solid fa-arrow-right-from-bracket me-2 icon"></i> Log Out
          </Link>
        </li>
      </ul>
  </div>


</div>

   
    
   
<div className="d-flex ">
<div className="p-4 display" style={{ width: "200px", minHeight: "100vh" }}>
        <div className="mt-4">
          <img  src="/Logo2.png" alt="" />
        </div>
        <ul className="margin">
          <li className=" mt-5">
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


<div className="container ">
<div className="main-content">
        <div className=" d-flex justify-content-between align-items-center  ">
          
          <input type="text" className="form-control search-bar me-3 rounded-5 shadow pt-3 pb-3 border-0"
            placeholder="Search Quiz "/>
            
            <button className="btn btn-primary  width btn-sm rounded-4 pt-2 pb-2  ">Start Quiz</button>
          <img className="user-avatar mt-3" src="/img.png" alt="" />
          
        </div>

        <div className="quiz-section ">
          <h5 className="">Front-End Quiz</h5>
          <div className="">
            {exams.map((exam: any) => (
              <div key={exam._id} className="quiz-item mt-4 ">
                <div className="quiz-details">
                  <h6>{exam.title}</h6>
                  <p>{exam.numberOfQuestions} Questions</p>
                </div>
                <div className="text-center">
                  <p>{exam.duration} Minutes</p>
                  <button className="btn btn-primary rounded-5 ps-5 pe-5  ">Start</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      
      </div>
</div>
      
    </div>
    </div>
    
   

  );
}
