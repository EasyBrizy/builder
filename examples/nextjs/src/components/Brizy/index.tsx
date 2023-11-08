"use client";

import { Builder } from "@brizy/builder";
import { Cms } from "@brizy/cms";
import { Core } from "@brizy/core";
import { Shopify } from "@brizy/shopify";
import { FC, useEffect, useRef } from "react";

const core = new Core();
const builder = new Builder(core);
new Cms(core);
new Shopify(core);

core.start();

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
    </>
  );
};

export { BrizyBuilder };
