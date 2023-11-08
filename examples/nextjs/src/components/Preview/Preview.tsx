"use client";

import { CORE } from "@utils/core";
import { useSearchParams } from "next/navigation";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";

const core = CORE.getInstance();

core.start();

const PagePreview: FC = (): ReactElement => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  const previewRef = useRef<HTMLDivElement>(null);

  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const previewItem = core.applyHook("GET_PREVIEW_ITEM", { id, slug });

    if (typeof previewItem === "string") {
      setPreview(previewItem);
    } else {
      throw new Error(
        `HTML Preview for item id: ${id}, slug: ${slug} not found`
      );
    }

    if (preview && previewRef.current) {
      previewRef.current.innerHTML = preview;
    }
  }, [id, preview, slug]);

  return (
    <>
      <div id="page__preview" ref={previewRef}></div>
    </>
  );
};

export { PagePreview };
