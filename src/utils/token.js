const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export default getAuthHeader;
