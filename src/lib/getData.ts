import client from "@/lib/contentful";
import * as cache from "@/lib/cache";

const USE_CACHE = process.env.USE_CACHE !== "false";

export const getHomePage = async () => {
  return getPage("3hSMZIOYpx6y4rylvbP0Nr");
};

export const getPage = async (entryId: string) => {
  const cachedPage = cache.get(entryId);
  console.log("USE_CACHE", !!USE_CACHE);
  if (USE_CACHE && cachedPage) {
    return cachedPage;
  }

  const entry = await client.getEntry(entryId);

  cache.set(entryId, entry);

  return entry;
};
