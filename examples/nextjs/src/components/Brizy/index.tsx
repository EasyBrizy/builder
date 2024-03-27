"use client";

import { Builder } from "@brizy/builder";
import { Cms } from "@brizy/cms-client";
import { Core } from "@brizy/core-client";
import { Shopify } from "@brizy/shopify";
import { Storage } from "@brizy/storage-client";
import { FC, useEffect, useRef } from "react";

const core = new Core({ apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "" });
const builder = new Builder(core, {
  editorToken: process.env.NEXT_PUBLIC_EDITOR_TOKEN ?? "",
});
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
      <div id="editor" style={{ height: "100vh" }} ref={containerRef}></div>
      <script src="https://cdn.brizylocal.com/pages/3.1.0/index.js" async />
    </>
  );
};

export { BrizyBuilder };
