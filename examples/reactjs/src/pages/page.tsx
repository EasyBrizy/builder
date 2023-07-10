import { API } from "../api";
import { BuilderComponent, CompilerData } from "@brizy/react";
import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Page = (): ReactElement => {
  const location = useLocation();
  const path = location.pathname.substring(1);

  const [page, setPage] = useState<CompilerData>();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    const api = API.getInstance();

    try {
      const data = await api.getHTMLByItem({
        collection: "page",
        item: path,
      });

      setPage(data);
    } catch (e) {
      setError(e as Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [path]);

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!page) {
    return <h1>Loading...</h1>;
  }

  return <BuilderComponent data={page} />;
};

export default Page;
