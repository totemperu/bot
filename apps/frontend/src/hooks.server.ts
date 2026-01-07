import type { Handle } from "@sveltejs/kit";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Server hook that runs on every request
 * Validates session and populates event.locals.user
 */
function getBackendUrl(): string {
  const tunnelFile = resolve(import.meta.dirname, "../../../.cloudflare-url");
  if (existsSync(tunnelFile)) {
    const url = readFileSync(tunnelFile, "utf-8").trim();
    if (url) {
      console.log(`[frontend] Using tunnel URL from .cloudflare-url: ${url}`);
      return url;
    }
  }
  const fallback = process.env.BACKEND_URL || "http://localhost:3000";
  console.log(`[frontend] Using fallback URL: ${fallback}`);
  return fallback;
}

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get("session");

  if (sessionToken) {
    try {
      // Backend URL from environment variable or tunnel file
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/auth/me`, {
        headers: {
          cookie: `session=${sessionToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        event.locals.user = data.user;
      }
    } catch (error) {
      // Silent fail - user remains null
    }
  }

  // Protect dashboard routes
  if (event.url.pathname.startsWith("/dashboard") && !event.locals.user) {
    return new Response(null, {
      status: 302,
      headers: { location: "/login" },
    });
  }

  return resolve(event);
};
