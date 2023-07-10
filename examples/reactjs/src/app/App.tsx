import Config from "../config";
import Init from "../pages/init";
import Page from "../pages/page";
import { ReactElement } from "react";

const App = (): ReactElement => {
  const apiKey = Config.apiKey;

  if (!apiKey) {
    return <Init />;
  }

  return <Page />;
};

export default App;
