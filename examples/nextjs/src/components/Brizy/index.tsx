"use client";

import { Builder } from "@brizy/builder";
import { Core } from "@brizy/core";
import { FC, useEffect, useRef } from "react";

const core = new Core();
const builder = new Builder(core);

const BrizyBuilder: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldRenderBuilder = useRef<boolean>(true);

  useEffect(() => {
    if (shouldRenderBuilder.current && containerRef.current) {
      shouldRenderBuilder.current = false;
      builder.render(containerRef.current);
    }
  }, []);

  return (
    <>
      <div id="editor" style={{ height: "100vh" }} ref={containerRef}></div>
      <script src="https://cdn.brizylocal.com/pages/3.1.0/index.js" />
      <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1.24.min.js" />
    </>
  );
};
export { BrizyBuilder };
