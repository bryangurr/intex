const API_URL =
  "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net";

export interface IdentityInfo {
  email: string;
  roles: string[];
}

export async function getIdentity(): Promise<IdentityInfo | null> {
  try {
    const response = await fetch(`${API_URL}/pingauth`, {
      method: "GET",
      credentials: "include", // Needed for cookie auth
    });

    if (!response.ok) {
      // Not authenticated or some error
      return null;
    }

    const data: IdentityInfo = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch identity info:", error);
    return null;
  }
}
