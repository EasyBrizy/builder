import { type AppLoadContext } from "@shopify/remix-oxygen";

const builderHost = "https://brizy.cloud";

export async function Config(context: AppLoadContext) {
  return {
    // @ts-ignore env
    apiKey: context.env.API_KEY,
    builderWelcomeUrl: `${builderHost}/share/zWuCORqKPEnqI8J`,
  };
}
