import { Divider } from "./Divider";
import { Information } from "./Information";
import { Steps } from "./Steps";
import React, { ReactElement } from "react";

export interface Props {
  token: string;
}

export const Install = ({ token }: Props): ReactElement => {
  return (
    <div className="flex items-center justify-center bg-no-repeat bg-cover md:h-[1024px] md:bg-[url('https://a-cloud.b-cdn.net/media/original/20acd60ff6e49607aa60f60eee49bf8b/bg-brizy-builder.jpg')] lg:h-[1335px] lg:items-start lg:pt-[335px]">
      <div className="flex flex-col text-cetaceanBlue font-sans bg-cover bg-no-repeat min-h-[100vh] md:min-h-[0vh] bg-[url('https://a-cloud.b-cdn.net/media/original/20acd60ff6e49607aa60f60eee49bf8b/bg-brizy-builder.jpg')] md:bg-none md:mx-[15px] md:flex-row lg:w-[1180px]">
        <Information title={`Documentation`} />
        <Divider />
        <Steps token={token} />
      </div>
    </div>
  );
};
