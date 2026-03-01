"use client";

 

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-transparent">
   
      <div className="flex space-x-3">
        <div className="w-5 h-5 bg-[#27A0DB] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-5 h-5 bg-[#27A0DB] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-5 h-5 bg-[#27A0DB] rounded-full animate-bounce"></div>
      </div>
      
  
      <p className="mt-6 text-[#27A0DB] font-bold tracking-widest animate-pulse">
        LOADING...
      </p>
    </div>
  );
};

export default Loading;