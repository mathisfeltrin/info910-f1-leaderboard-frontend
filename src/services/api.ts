const API_BASE_URL = "/api";

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/drivers/health`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return { success: true, data };
  } catch (error) {
    console.error("Error calling health endpoint:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getLeaderboard() {
  const response = await fetch(`${API_BASE_URL}/drivers/leaderboard`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getDriverDetails(driverName: string) {
  const response = await fetch(`${API_BASE_URL}/drivers/${driverName}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
