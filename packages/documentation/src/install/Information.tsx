import { Description } from "./Description";
import { Title } from "./Title";
import React from "react";

interface Props {
  title: string;
}
export const Information = ({ title }: Props) => {
  return (
    <div className="flex flex-col flex-[1_1_0%] my-[25px] mx-[15px] md:my-[20px] md:mr-[18px]">
      <Title title={title} />
      <Description
        content={
          <div className="lg:text-[20px] lg:leading-[2.40rem]">
            <span>
              To connect our template to <b>Vercel</b> you should accomplish a
              few steps which you can find on the right.
            </span>
          </div>
        }
      />
    </div>
  );
};
