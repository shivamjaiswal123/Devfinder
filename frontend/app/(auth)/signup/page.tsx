"use client";

import { useState } from "react";
import axios from "axios";
import AccountInstruction from "@/components/AccountInstruction";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        { username, email, password },
        { withCredentials: true } // Ensures cookies are sent (if applicable)
      );

      console.log("Signup successful:", data);
      if(data){
        router.push('/');
      }
      // Handle success (e.g., redirect to login page)
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-white text-3xl font-medium mb-6">
        Create your free account
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Username</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button label="Sign up" variant="secondary" size="lg" onClick={handleSignup} disabled={loading} />
      <AccountInstruction label="Already have an account?" nav="Signin" route="signin" />
    </div>
  );
};

export default SignupPage;
