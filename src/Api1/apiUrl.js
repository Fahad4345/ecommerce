const DEPLOYED_URL = "https://backend-production-7ad70.up.railway.app";
const LOCAL_URL = "http://localhost:3001";

export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? DEPLOYED_URL : LOCAL_URL;
