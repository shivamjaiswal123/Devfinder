import { ReactNode } from 'react';

type AuthLayoutProp = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProp) => {
  return (
    <div className="flex min-h-screen tracking-wider">
      {/* left side */}
      <div className="w-2/5">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80"
          alt="Abstract"
          className="h-full object-cover"
        />
      </div>

      {/* right side */}
      <div className="bg-gray-900 flex justify-center items-center flex-grow">
        <div className="max-w-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
