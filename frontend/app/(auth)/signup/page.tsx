"use client";

import { useState } from "react";
import axios from "axios";
import AccountInstruction from "@/components/AccountInstruction";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

interface SignUpData {
  email: string;
  password: string;
  username:string;
}
interface SignUpResponse {
  message: string;
  token: string; 
}


const signupUser = async (data: SignUpData): Promise<SignUpResponse> => {
  const response = await axios.post("http://localhost:3000/api/v1/user/signup", data, { withCredentials: true });
  return response.data;
};


const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {mutateAsync: signUpMutation, isPending} = useMutation({
    mutationFn: signupUser,
    onSuccess: ()=>{
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Signin failed:", error.response?.data?.message || error);
    },
  })

  if(isPending){
  }

  return (
    <div className="space-y-4">
      <h1 className="text-white text-3xl font-medium mb-6">
        Create your free account
      </h1>
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
      <Button label="Sign up" variant="secondary" size="lg" onClick={async ()=>{
        try{
          await signUpMutation({ email, username, password });
        }catch(e){
          console.error(e);
        }
      }}/>
      <AccountInstruction label="Already have an account?" nav="Signin" route="signin" />
    </div>
  );
};

export default SignupPage;
