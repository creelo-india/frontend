// Strictly use VITE_API_BASE_URL everywhere (no fallback).
// CRA does not expose import.meta.env, so under CRA we read REACT_APP_API_BASE_URL (same value in .env).
const getBaseUrl = () => {
  const url =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    process.env.REACT_APP_API_BASE_URL;
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
};

export const CONFIG = {
  BASE_URL: getBaseUrl(),
};