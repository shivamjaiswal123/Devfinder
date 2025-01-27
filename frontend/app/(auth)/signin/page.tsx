import AccountInstruction from '@/components/AccountInstruction';
import Button from '@/components/Button';
import Input from '@/components/Input';

const SigninPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-white text-3xl font-medium mb-6">
        Sign In to your account
      </h1>
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Username or Email</label>
        <Input />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Password</label>
        <Input />
      </div>
      <Button label="Sign in" variant="secondary" size="lg" />
      <AccountInstruction
        label="Don't have an account?"
        nav="Signup"
        route="signup"
      />
    </div>
  );
};

export default SigninPage;
