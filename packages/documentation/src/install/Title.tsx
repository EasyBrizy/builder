import * as React from "react";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return (
    <span className="text-[40px] font-bold my-[14px] tracking-tighter break-all md:my-[0px] md:leading-[3rem] md:mb-[20px]">
      {title}
    </span>
  );
};
