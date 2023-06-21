"use client";

import { Button } from "@components/Button";
import { brizyHost, linkShareUid } from "@utils/api";
import React, { ReactElement } from "react";

interface Props {
  host: string;
}

export const Connect = (props: Props): ReactElement => {
  const handleClick = () => {
    const host = props.host;

    window.location.replace(
      `${brizyHost}/share/${linkShareUid}?redirectUrl=${host}/init`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your App!</h1>
      <p className="text-xl text-gray-600 mb-12">
        Connect your third-party applications to get started.
      </p>
      <div className="flex">
        <Button onClick={handleClick}>Connect Brizy Cloud</Button>
      </div>
    </div>
  );
};
