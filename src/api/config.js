// Strictly use VITE_API_BASE_URL everywhere (no fallback).
// CRA does not expose import.meta.env, so under CRA we read REACT_APP_API_BASE_URL (same value in .env).
const getBaseUrl = () => {
  const url =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    process.env.REACT_APP_API_BASE_URL;
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
};

const getUserRoleId = () =>
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_USER_ROLE_ID) ||
  process.env.REACT_APP_USER_ROLE_ID ||
  "";

// Backend report: vendor-listings API is pending. Set to true when backend implements GET /api/catalog/vendor-listings.
const isVendorListingsEnabled = () => {
  const v =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_VENDOR_LISTINGS_ENABLED) ||
    process.env.REACT_APP_VENDOR_LISTINGS_ENABLED;
  return v === "true" || v === "1";
};

export const CONFIG = {
  BASE_URL: getBaseUrl(),
  USER_ROLE_ID: getUserRoleId(),
  VENDOR_LISTINGS_ENABLED: isVendorListingsEnabled(),
};