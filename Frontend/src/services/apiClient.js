let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const { headers, ...restOptions } = options;

  const mergedHeaders = {
    Accept: "application/json",
    ...headers,
  };
  if (token) {
    mergedHeaders["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(url, { ...restOptions, headers: mergedHeaders });

  if (res.status === 401 && !url.includes("/refresh-token")) {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) {
      throw new Error("Unauthorized");
    }

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          }
        );
        const refreshData = await refreshRes.json();
        if (!refreshRes.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          processQueue(new Error("Session expired"));
          throw new Error("Session expired");
        }
        localStorage.setItem("token", refreshData.token);
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        processQueue(null, refreshData.token);
        mergedHeaders["Authorization"] = `Bearer ${refreshData.token}`;
        res = await fetch(url, { ...restOptions, headers: mergedHeaders });
        return res;
      } catch (err) {
        processQueue(err);
        throw err;
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        mergedHeaders["Authorization"] = `Bearer ${newToken}`;
        return fetch(url, { ...restOptions, headers: mergedHeaders });
      });
    }
  }

  return res;
}
