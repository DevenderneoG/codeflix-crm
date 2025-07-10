import React from "react";

const CardDataStats = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-sm border border-[#e2e8f0] bg-white py-6 px-7.5 shadow-default dark:border-[#313d4a] dark:bg-[#313d4a] h-full">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#eff2f7] dark:bg-[#313d4a]">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-bold text-black dark:text-[#313d4a] mb-4">
            {total}
          </h4>
          <span className="text-lg font-medium">{title}</span>
        </div>        
      </div>      
    </div>
  );
};

export default CardDataStats;
