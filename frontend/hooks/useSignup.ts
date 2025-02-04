import { useMutation } from "@tanstack/react-query"
import { useRouter } from 'next/navigation';
import axios from "axios";

interface SignUpData {
    email: string;
    password: string;
    username: string;
}

interface SignUpResponse {
    message: string;
    token: string;
}

const signupUser = async (data: SignUpData): Promise<SignUpResponse> => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", data, { withCredentials: true });
    return response.data;
};

export const useSignup = () => {
    const router = useRouter()

    return useMutation<SignUpResponse, Error, SignUpData> ({
        mutationFn: signupUser,
        onSuccess: ()=>{
            router.push("/")
        },
        onError: async (error: any) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.error("SignUp failed:", error.response?.data?.message || error);
        },
    })
}