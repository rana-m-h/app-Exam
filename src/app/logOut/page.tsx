
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const [errorMessage, setMessage] = useState("");


  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch("https://exam.elevateegy.com/api/v1/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${localStorage.getItem("Token")}`,
          },
        });

        if (!response.ok) {
          setMessage( "Failed to log out from server.");
        }

     
        localStorage.removeItem("Token");
        router.push("/login");
      } catch (error) {
        setMessage("An error occurred during logout:");
      }
    };

    handleLogout();
  }, [router]);
   
}
