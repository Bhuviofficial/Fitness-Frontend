const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getReminders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/reminders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reminders");
  }

  return res.json();
};
