"use client";

import { useState } from "react";
import axios from "axios";
import AccountInstruction from '@/components/AccountInstruction';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';

const SigninPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        { email, password },
        { withCredentials: true } // Ensures cookies are sent (if applicable)
      );

      console.log("Signin successful:", data);
      if(data){
        router.push('/');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Signin failed";
      console.error("Error during sign-in:", err);
      setError(typeof errorMessage === "string" ? errorMessage : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-white text-3xl font-medium mb-6">
        Sign In to your account
      </h1>
      {error && <p className="text-red-500">{error}</p>}
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
      <Button label="Sign in" variant="secondary" size="lg" onClick={handleSignin} disabled={loading} />
      <AccountInstruction
        label="Don't have an account?"
        nav="Signup"
        route="signup"
      />
    </div>
  );
};

export default SigninPage;
