import { Step } from "./Step";
import React from "react";

interface Props {
  token: string;
}
export const Steps = ({ token }: Props) => {
  return (
    <div className="flex flex-col flex-[2_2_0%] mx-[15px] md:my-[20px] md:ml-[15px] lg:ml-[75px]">
      <div className="mb-[15px] md:mb-[0px]" />
      <Step
        title="Step 1: Choose project"
        content={
          <div className="text-[17px]">
            <div>
              <span className="leading-8">
                Access the project from <i>Dashboard</i>.
              </span>
            </div>
          </div>
        }
      />
      <div className="mb-[59px]" />
      <Step
        title="Step 2: Find the environment variables"
        content={
          <div className="text-[17px] break-all">
            <div>
              <span className="leading-8">
                In tab <i>Setting</i> access the menu{" "}
                <i>Environment Variables.</i>
              </span>
            </div>
          </div>
        }
      />
      <div className="mb-[59px]" />
      <Step
        title="Step 3: Fill the environment variable"
        content={
          <div className="text-[17px] break-all">
            <span className="leading-8">
              The <i>key</i> should be: <b>API_KEY</b> and the <i>value</i>
              {" : "}
              <br />
              <br />
              <div>
                <i>{token}</i>
                &nbsp; &nbsp; &nbsp;
                <button
                  className="text-oceanBlue"
                  onClick={() => {
                    navigator.clipboard.writeText(token);
                  }}
                >
                  <b>Copy</b>
                </button>
              </div>
            </span>
          </div>
        }
      />
      <div className="mb-[65px]" />
      <div className="text-[16px] text-russianViolet opacity-60 leading-[1.8rem] tracking-[-.023em]">
        <em>
          Note: Please use the following credentials to add Brizy to Vercel.
        </em>
      </div>
    </div>
  );
};
