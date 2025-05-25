export const API_URL = "'http://127.0.0.1:8000/api/v0/";

export const ENDPOINTS = {
    login: `${API_URL}/login`,
    register: `${API_URL}/register`,
    profile: `${API_URL}/profile`,
    users: `${API_URL}/users`,
    courses: `${API_URL}/courses`,
    swapRequests: `${API_URL}ntoif/`,
    acceptswapRequest: (id: string) => `${API_URL}/swap-requests/${id}/accept/`,
    refuserequest: (id: string) => `${API_URL}/swap-requests/${id}/reject/`,
    notifications: `${API_URL}/notifications`,
};
