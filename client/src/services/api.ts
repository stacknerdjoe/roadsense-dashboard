const API_BASE = "http://localhost:5000/api";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};
