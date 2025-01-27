import Link from 'next/link';

interface AccountInstructionProps {
  label: string;
  nav: string;
  route: string;
}
export default function AccountInstruction({
  label,
  nav,
  route,
}: AccountInstructionProps) {
  return (
    <div>
      <p className=" text-white mt-2 text-sm">
        {label}{' '}
        <Link
          href={route}
          className="text-base text-blue-600  hover:underline hover:underline-offset-2"
        >
          {nav}
        </Link>
      </p>
    </div>
  );
}
