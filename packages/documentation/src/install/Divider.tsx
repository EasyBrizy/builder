import { ReactElement } from "react";

export const Divider = (): ReactElement => {
  return (
    <div className="lg:ml-[33px]">
      <div className="w-[1px] h-[100%] bg-black opacity-10" />
    </div>
  );
};
