import router from "../router"
class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      return user?.refresh
    } else {
      router.push({ name: "Login" })
    }
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      return user?.access
    } else {
      router.push({ name: "Login" })
    }
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"))
    user.access = token
    localStorage.setItem("user", JSON.stringify(user))
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"))
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem("user")
  }
}

export default new TokenService()
