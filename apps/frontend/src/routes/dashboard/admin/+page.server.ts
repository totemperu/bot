import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    redirect(307, "/login");
  }

  if (locals.user.role !== "admin") {
    redirect(303, "/dashboard");
  }

  return {
    user: locals.user,
  };
};
