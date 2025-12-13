export function request(url, method, data) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const apiUrl = url.startsWith("http") ? url : `${baseUrl}/api${url}`;

  return fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  }).then((res) => res.json());
}
