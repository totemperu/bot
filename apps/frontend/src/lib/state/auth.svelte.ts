import { browser } from "$app/environment";
import { fetchApi } from "$lib/utils/api";

type User = {
  username: string;
  role: string;
  name: string;
  is_available?: number;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

function createAuthState() {
  let state = $state<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  return {
    get user() {
      return state.user;
    },
    get isAuthenticated() {
      return state.isAuthenticated;
    },
    get isLoading() {
      return state.isLoading;
    },
    get isAdmin() {
      return state.user?.role === "admin";
    },
    get isDeveloper() {
      return state.user?.role === "developer";
    },
    get isSupervisor() {
      return state.user?.role === "supervisor";
    },
    get canEditCatalog() {
      return this.isAdmin || this.isDeveloper || this.isSupervisor;
    },
    get canApproveOrders() {
      return this.isAdmin || this.isSupervisor;
    },
    get canApproveCaliida() {
      return this.isAdmin;
    },
    get canAccessReports() {
      return this.isAdmin || this.isDeveloper || this.isSupervisor;
    },
    get canAccessSimulator() {
      return this.isAdmin || this.isDeveloper;
    },
    get isSalesAgent() {
      return state.user?.role === "sales_agent";
    },
    get isAvailable() {
      return state.user?.is_available === 1;
    },
    hydrate(user: User | null) {
      state.user = user;
      state.isAuthenticated = Boolean(user);
      state.isLoading = false;
    },
    async checkAuth() {
      try {
        const data = await fetchApi<{ user: User | null }>("/api/auth/me");
        state.user = data.user;
        state.isAuthenticated = Boolean(data.user);
      } catch {
        this.logout();
      } finally {
        state.isLoading = false;
      }
    },
    async logout() {
      try {
        await fetchApi("/api/auth/logout", { method: "POST" });
      } finally {
        state.user = null;
        state.isAuthenticated = false;
        if (browser && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    },
    async toggleAvailability() {
      if (!state.user) return;

      const newStatus = state.user.is_available === 1 ? 0 : 1;
      try {
        await fetchApi("/api/auth/availability", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAvailable: newStatus === 1 }),
        });

        if (state.user) {
          state.user.is_available = newStatus;
        }
      } catch (error) {
        console.error("Failed to toggle availability:", error);
      }
    },
  };
}

export const auth = createAuthState();
