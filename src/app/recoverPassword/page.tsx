
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
export default function ForgotPassword() {
const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://exam.elevateegy.com/api/v1/auth/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
    
      if (response.ok) {
        setMessage({ type: "success", text: "A reset code has been sent to your email." });
        router.push('/verifyCode');
      } else {
        setMessage({ type: "error", text: data.message || "Failed to send reset code." });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-75 mb-5 mt-5 d-flex bg-light   w-50">
      <div className="row">
     
      <div className="col-md-6 image shadow  ">
          <div className="text-center">
            <h2 className="text-md-start ms-5">Welcome to</h2>
            <h1 className="text-primary text-md-start ms-5">Elevate</h1>
            <p className="text-md-start ms-5 text">
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
            </p>
            <Image
             src="/bro.png"
              alt="Illustration"
              className="img-fluid "
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
    
  

<div className="col-md-6 d-flex align-items-center justify-content-center">
<div className="w-75">


<div className=" d-flex justify-content-end  mb">
              <a href="#" className="me-3">English</a>
              <Link className="me-3" href={"/login"}>signup</Link>
              <Link  href={"/register"}>Register</Link>
            </div>
            {message.text && (
        <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
          {message.text}
        </div>
      )}

<form  onSubmit={handleSubmit}>
<h3 className="text mb-3">Forgot your password?</h3>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </div>
        <Link href="/recoverPassword" className="d-block text-end mt-2">Recover password?</Link>
        <button  type="submit"  className="btn btn-primary w-100 rounded-4 mt-3" disabled={loading}>
          {loading ? "Sending..." : "Send Code"}
        </button>
        <div className="text-center mt-3">
              <p>Or continue with</p>
              <div className="d-flex justify-content-center">
            
    
        <div
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
        >
          <Image width={20} height={20} alt="google" src={"/Logo Google.png"} />
        </div>
        <div
          onClick={() => signIn("facebook", { callbackUrl: "/home" })}
          className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
        >
          <Image width={20} height={20} alt="fasbook" src={"/Vector.png"} />
        </div>
        <div
          onClick={() => signIn("twitter", { callbackUrl: "/home" })}
          className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
        >
          <Image width={20} height={20} alt="twitter" src={"/Logo.png"} />
        </div>
        <div
          onClick={() => signIn("github", { callbackUrl: "/home" })}
          className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
        >
          <Image width={20} height={20} alt="Apple" src={"/Logo (1).png"} />
        </div>
              </div>
            </div>
      </form>


</div>


</div>

    

      </div>
 
    </div>
  );
}
