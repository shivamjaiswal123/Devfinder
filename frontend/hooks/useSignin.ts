import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

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

export const useSignin = () => {
    const router = useRouter()

    return useMutation<SignInResponse, Error, SignInData> ({
        mutationFn: signinUser,
        onSuccess: ()=>{
            router.push("/")
        },
        onError: async (error: any) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.error("Signin failed:", error.response?.data?.message || error);
        },
    })
}