import axios from "axios"

const API_URL = "http://localhost:8002"

class AuthService {
  login(user) {
    return this.axios
      .post(API_URL + "/api/token/", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem("user")
  }

  register(user) {
    return axios.post(API_URL + "/auth/register", {
      username: user.username,
      email: user.email,
      password: user.password,
      password2: user.password2,
      first_name: user.first_name,
      last_name: user.last_name,
    })
  }
}

export default new AuthService()
