import { fetchFaviconResponse } from "@/lib/siteIcons";

export const dynamic = "force-dynamic";

export default async function AppleIcon() {
  return fetchFaviconResponse();
}
