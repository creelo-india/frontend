import axiosClient from "./interceptorApi";

const API = {
  categories: () => axiosClient.get("api/categories"),
  categoryTypes: (categoryId) => axiosClient.get(`api/categories/${categoryId}/types`),
  masterProducts: (params = {}) => {
    const q = new URLSearchParams();
    if (params.categoryId != null) q.set("categoryId", params.categoryId);
    if (params.includeInactive != null) q.set("includeInactive", params.includeInactive);
    const query = q.toString();
    return axiosClient.get(`api/catalog/master-products${query ? `?${query}` : ""}`);
  },
  masterProduct: (id) => axiosClient.get(`api/catalog/master-products/${id}`),
  vendorListings: (params = {}) => {
    const q = new URLSearchParams();
    if (params.categoryId != null) q.set("categoryId", params.categoryId);
    if (params.masterProductId != null) q.set("masterProductId", params.masterProductId);
    if (params.search != null) q.set("search", params.search);
    if (params.page != null) q.set("page", params.page);
    if (params.limit != null) q.set("limit", params.limit);
    const query = q.toString();
    return axiosClient.get(`api/catalog/vendor-listings${query ? `?${query}` : ""}`);
  },
};

export default API;
