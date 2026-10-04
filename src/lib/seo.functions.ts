import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

export const getSiteOrigin = createServerFn({ method: "GET" }).handler(() => {
  try {
    return new URL(getRequestUrl()).origin;
  } catch {
    return "";
  }
});
