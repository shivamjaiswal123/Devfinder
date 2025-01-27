interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

const buttonVariant = {
  primary: 'text-white bg-black hover:bg-gray-700',
  secondary: 'border text-white',
};

const buttonSize = {
  sm: 'px-3 py-2',
  md: 'px-6 py-3',
  lg: 'w-full py-3',
};

const defaultStyle = 'rounded-md font-medium text-sm';

function Button({ label, variant, size }: ButtonProps) {
  return (
    <button
      className={`${buttonVariant[variant]} ${buttonSize[size]} ${defaultStyle}`}
    >
      {label}
    </button>
  );
}

export default Button;
