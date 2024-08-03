interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
