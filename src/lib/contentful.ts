import { createClient, ContentfulClientApi } from "contentful";

const client: ContentfulClientApi<any> = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export default client;
