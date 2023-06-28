import { ReactElement } from "react";

interface Props {
  href: string;
}
export const Welcome = ({ href }: Props): ReactElement => {
  const handleClick = () => {
    window.location.replace(href);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-no-repeat bg-cover bg-[url('https://a-cloud.b-cdn.net/media/original/20acd60ff6e49607aa60f60eee49bf8b/bg-brizy-builder.jpg')] bg-red-800 p-[20px]">
      <div className="img">
        <img
          height="90px"
          width="90px"
          src="https://a-cloud.b-cdn.net/media/original/0218ab9f5dcad9d431490666835988d0/Brizy new mark.svg"
          alt=""
          draggable="false"
          loading="lazy"
        />
      </div>
      <div className="text-[36px] md:text-[38px] lg:text-[60px] text-center font-bold leading-[46px] pt-[50px] pb-[40px] tracking-[-1px] lg:w-[820px] lg:leading-[72px] lg:tracking-[-2px]">
        Welcome to Brizy
      </div>
      <div className="text-center text-[15px] font-light pb-[50px] leading-[24px] lg:text-[20px] lg:w-[820px] lg:leading-[38px]">
        To integrate our template on Verce please click on{" "}
        <span className="font-bold text-oceanBlue">connect</span> button to
        receive the API_KEY.
      </div>
      <button
        className="bg-oceanBlue text-[15px] md:text-[17px] font-bold py-[11px] px-[25px] rounded-[4px] text-white lg:py-[19px] lg:px-[44px] lg:tracking-[1px] lg:text-[15px]"
        onClick={handleClick}
      >
        CONNECT
      </button>
    </div>
  );
};
