"use client";

import { Builder } from "@brizy/builder";
import { Cms } from "@brizy/cms";
import "@brizy/cms/dist/main.css";
import { Shopify } from "@brizy/shopify";
import { Storage } from "@brizy/storage";
import { CORE } from "@utils/core";
import { FC, useEffect, useRef } from "react";

const core = CORE.getInstance();
const builder = new Builder(core);

new Cms(core);
new Shopify(core);
new Storage(core);

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
      <script src="https://cdn.brizylocal.com/pages/3.1.0/index.js" />
      <div id="editor" style={{ height: "100vh" }} ref={containerRef}></div>
    </>
  );
};

export { BrizyBuilder };
