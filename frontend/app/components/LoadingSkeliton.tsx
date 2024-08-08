import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="h-[100%] w-[100%] rounded-lg flex flex-col justify-center items-center space-y-4">
      <div className="h-[20%] w-[100%] flex justify-center items-center space-x-4">
        <div className="h-[100%] w-[30%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="h-[100%] w-[60%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
      <div className="h-[10%] w-[100%] flex justify-center items-center space-x-4">
        <div className="h-[100%] w-[50%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="h-[100%] w-[40%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
      <div className="h-[40%] w-[100%] flex justify-center items-center space-x-4">
        <div className="h-[100%] w-[60%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="h-[100%] w-[30%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
      <div className="h-[20%] w-[100%] flex justify-center items-center space-x-4">
        <div className="h-[100%] w-[40%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="h-[100%] w-[50%] bg-black-700 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;