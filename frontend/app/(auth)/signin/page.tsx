"use client";

import { useState } from "react";
import axios from "axios";
import AccountInstruction from '@/components/AccountInstruction';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';


interface SignInData {
  email: string;
  password: string;
}
interface SignInResponse {
  message: string;
  token: string; // Adjust based on your actual API response
}


const signinUser = async (data: SignInData): Promise<SignInResponse> => {
  const response = await axios.post("http://localhost:3000/api/v1/user/signin", data, { withCredentials: true });
  return response.data;
};


const SigninPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {mutateAsync: signInMutation,} = useMutation({
    mutationFn: signinUser,
    onSuccess: ()=>{
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Signin failed:", error.response?.data?.message || error);
    },
  })
  
 

  return (
    <div className="space-y-4">
      <h1 className="text-white text-3xl font-medium mb-6">
        Sign In to your account
      </h1>
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
      <Button label="Sign in" variant="secondary" size="lg" onClick={async ()=>{
        try{
          await signInMutation({ email, password });
        }catch(e){
          console.error(e);
        }
      }}/>
      <AccountInstruction
        label="Don't have an account?"
        nav="Signup"
        route="signup"
      />
    </div>
  );
};

export default SigninPage;
