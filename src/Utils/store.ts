export function getData(key: string) {
  return localStorage.getItem(key) || "";
}

export function setData<T>(key: string, userData: T) {
  if (typeof userData === "string") {
    localStorage.setItem(key, JSON.stringify(userData));
    return;
  }
}
