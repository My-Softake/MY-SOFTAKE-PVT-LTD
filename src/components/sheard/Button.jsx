export default function Button({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}       
      onClick={onClick}   
      className={`border border-blue-500 text-white px-8 py-3 rounded-full font-semibold uppercase  ${className}`}
    >
      {children}
    </button>
  );
}  


