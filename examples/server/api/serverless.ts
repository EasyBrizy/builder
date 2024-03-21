import serverless from "serverless-http";
import api from "./index";

// Export express API as serverless function
export const handler = serverless(api);
