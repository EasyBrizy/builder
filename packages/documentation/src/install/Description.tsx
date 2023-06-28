import { ReactElement } from "react";

interface Props {
  content: ReactElement;
}
export const Description = ({ content }: Props) => {
  return <div className="text-[15px] leading-[1.5rem]">{content}</div>;
};
