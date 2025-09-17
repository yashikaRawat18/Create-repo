// Remove deleted users from localStorage accounts
export const cleanAccounts = (validIds: string[]) => {
  let accounts: any[] = [];
  try {
    accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  } catch {}
  const filtered = accounts.filter((a) => validIds.includes(a.id));
  localStorage.setItem("accounts", JSON.stringify(filtered));
};
// Simple auth utility for session handling

// Store the current user and maintain a list of accounts
export const setUser = (user: { id: string; username: string }) => {
  localStorage.setItem("user", JSON.stringify(user));
  let accounts: any[] = [];
  try {
    accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  } catch {}
  if (!accounts.find((a) => a.id === user.id)) {
    accounts.push(user);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
};

export const getAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem("accounts") || "[]");
  } catch {
    return [];
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};


export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const switchUser = (id: string) => {
  const accounts = getAccounts();
  const user = accounts.find((a: any) => a.id === id);
  if (user) {
    setUser(user);
    window.location.reload();
  }
};
