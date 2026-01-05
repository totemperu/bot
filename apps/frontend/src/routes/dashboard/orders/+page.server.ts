import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const sessionToken = cookies.get("session");
  if (!sessionToken) {
    return { orders: [] };
  }

  const status = url.searchParams.get("status") || "";
  const startDate = url.searchParams.get("startDate") || "";
  const endDate = url.searchParams.get("endDate") || "";

  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const res = await fetch(
      `http://localhost:3000/api/orders?${params.toString()}`,
      {
        headers: { cookie: `session=${sessionToken}` },
      },
    );

    if (!res.ok) {
      return { orders: [] };
    }

    const orders = await res.json();
    return { orders };
  } catch {
    return { orders: [] };
  }
};
