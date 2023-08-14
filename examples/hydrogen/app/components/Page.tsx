import { API } from "../../api";
import { BuilderComponent, CompilerData } from "@brizy/react";
import { useParams } from "@remix-run/react";
import React, { ReactElement, useEffect, useState } from "react";

export interface PageProps {
  config: {
    apiKey: string;
    builderWelcomeUrl: string;
  };
}

export default function Page(props: PageProps): ReactElement {
  const {
    config: { apiKey },
  } = props;

  const { index } = useParams();

  const [page, setPage] = useState<CompilerData>();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    const api = await API.getInstance(apiKey);

    try {
      const data = await api.getHTMLByItem({
        collection: "page",
        item: index,
      });

      setPage(data);
    } catch (e) {
      setError(e as Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [index]);

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!page) {
    return <h1>Loading...</h1>;
  }

  return <BuilderComponent data={page} />;
}
