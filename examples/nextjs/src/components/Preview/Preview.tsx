"use client";

import { Storage } from "@brizy/storage";
import { CORE } from "@utils/core";
import { useSearchParams } from "next/navigation";
import React, { FC, ReactElement, useEffect, useState } from "react";

const core = CORE.getInstance();
new Storage(core);

const PagePreview: FC = (): ReactElement => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getPreviewItem = async () => {
    try {
      setLoading(true);

      const previewHTML = await core.applyHook("PREVIEW_GET", { id, slug });

      if (typeof previewHTML === "string") {
        setHtml(previewHTML);
      } else {
        setHtml(null);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPreviewItem();
  }, []);

  return (
    <>
      {loading ? (
        <h1
          style={{
            color: "blue",
            textAlign: "center",
          }}
        >
          L O A D I N G . . .
        </h1>
      ) : (
        <div
          id="page__preview"
          dangerouslySetInnerHTML={{
            __html:
              typeof html === "string"
                ? html
                : "<h1 style='color: red'>Cannot find preview for item...</h1>",
          }}
        ></div>
      )}
    </>
  );
};

export { PagePreview };
