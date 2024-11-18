export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser"))

  if (obj && obj?.access_token) {
    return { Authorization: `Bearer ${obj.access_token}` }
  } else {
    return {}
  }
}
