import React from 'react';

const Separator: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex justify-center items-center mb-4">
    <div className="w-full h-[1px] bg-black"></div>
    {text && <div className="mx-3 text-sm font-semibold text-black">{text}</div>}
    <div className="w-full h-[1px] bg-black"></div>
  </div>
);
export default Separator;
