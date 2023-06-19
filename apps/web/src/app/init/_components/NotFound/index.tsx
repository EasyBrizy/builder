import React, { ReactElement } from "react";

export const NotFound = (): ReactElement => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">
        Welcome to My Page!
      </h1>
      <div className="bg-red-500 text-white px-4 py-2 mt-8">
        <p className="font-bold">Error:</p>
        <p>Missing keys in the config</p>
        <p>
          <span>
            Site URL:{" "}
            <span className="text-yellow-500">NEXT_PUBLIC_SITE_URL</span>
          </span>
        </p>
        <p>
          <span>
            Vercel URL:{" "}
            <span className="text-yellow-500">NEXT_PUBLIC_VERCEL_URL</span>
          </span>
        </p>
      </div>
    </div>
  );
};
