export const validateSession = async () => {
  const response = await fetch("http://localhost:4000/auth/session", {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    return data.userId, true;
  } else {
    return false;
  }
};
