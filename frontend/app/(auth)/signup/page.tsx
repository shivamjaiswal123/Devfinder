import AccountInstruction from '@/components/AccountInstruction';
import Button from '@/components/Button';
import Input from '@/components/Input';

const SignupPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-white text-3xl font-medium mb-6">
        Create your free account
      </h1>
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Username</label>
        <Input />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Email</label>
        <Input />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-200 mb-2">Password</label>
        <Input />
      </div>
      <Button label="Sign up" variant="secondary" size="lg" />
      <AccountInstruction
        label="Already have an account?"
        nav="Signin"
        route="signin"
      />
    </div>
  );
};

export default SignupPage;
