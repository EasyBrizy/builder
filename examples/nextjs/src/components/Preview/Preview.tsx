"use client";

import { CORE } from "@utils/core";
import { useSearchParams } from "next/navigation";
import React, { FC, ReactElement } from "react";

const core = CORE.getInstance();

core.start();

const PagePreview: FC = (): ReactElement => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  const previewItem = core.applyHook("GET_PREVIEW_ITEM", {
    id,
    slug,
  });

  return (
    <>
      <div
        id="page__preview"
        dangerouslySetInnerHTML={{
          __html:
            typeof previewItem === "string"
              ? previewItem
              : "<h1 style='color: red'>Cannot find preview for item...</h1>",
        }}
      ></div>
    </>
  );
};

export { PagePreview };
