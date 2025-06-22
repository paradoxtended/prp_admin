const Loader: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center h-full">
      <svg
        className="animate-spin h-8 w-8 mr-3 text-lime-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="opacity-25" cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="4" />
        <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10v4c3.314 0 6 2.686 6 6h4z" />
      </svg>
    </div>
  );
};

export default Loader;
