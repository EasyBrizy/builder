import Check from "./asset/check.svg";
import React, { ReactElement } from "react";

interface Props {
  title: string;
  content: ReactElement;
}

export const Step = ({ title, content }: Props) => {
  return (
    <div className="flex">
      <div className="flex-none w-12 mr-[6px]">
        <Check className="w-[34px] h-[34px]" />
      </div>
      <div className="flex-1">
        <h1 className="text-[24px] font-bold mt-[4px] mb-[6px] tracking-[-.02em]">
          {title}
        </h1>
        <div className="text-gray-700 ">{content}</div>
      </div>
    </div>
  );
};
