# Deploy brizy api server on hosting platforms:
___

### Deploy Brizy Builder server to VERCEL
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FEasyBrizy%2Fbuilder%2F&root-directory=examples%2Fserver&env=BUNNY_HOST_NAME,BUNNY_STORAGE_ZONE_NAME,BUNNY_ACCESS_KEY&envDescription=API%20keys%20are%20needed%20to%20be%20able%20to%20upload%20your%20own%20media%20files%20on%20CDN&project-name=brizy-builder-server&repository-name=brizy-builder-server)


### Deploy Server to Netlify
Deploy on netlify require aditional configuration steps in accordance with the [oficial documentation](https://docs.netlify.com/frameworks/express/#deploy-an-express-app-on-netlify)
1. install dependency in `@brizy/server`:
```bash 
npm i express serverless-http @netlify/functions
```
2. Create a file `serverless.ts` in api folder where export the express router as serverless function and commit these change to your repo.
```typescript
// ...examples/server/api/serverless.ts

import serverless from "serverless-http";
import api from "./index";

export const handler = serverless(api);
```

3. Deploy the server from the netlify UI

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/EasyBrizy/builder)