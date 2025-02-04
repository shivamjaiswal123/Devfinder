"use client";

import { useState } from "react";
import AccountInstruction from "@/components/AccountInstruction";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSignup } from "@/hooks/useSignup";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {mutateAsync: signUpMutation, isPending} = useSignup();

  return (
    <div className="space-y-4">
      <h1 className="text-white text-3xl font-medium mb-6">
        Create your free account
      </h1>
      
      {/* Show Loading Indicator */}
      {isPending && (
        <p className="text-gray-300">Processing your request...</p>
      )}

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
      <Button label={isPending ? "Signing up..." : "Sign up"} variant="secondary" size="lg" onClick={async ()=>{
        try{
          await signUpMutation({ email, username, password });
        }catch(e){
          console.error(e);
        }
      }} disabled={isPending}/>
      <AccountInstruction label="Already have an account?" nav="Signin" route="signin" />
    </div>
  );
};

export default SignupPage;
