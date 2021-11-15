import api from "./api"
import TokenService from "./token.service"

class AuthService {
  login(user) {
    return api
      .post("api/token/", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.access) {
          TokenService.setUser(response.data)
        }
        return response.data
      })
  }

  logout() {
    TokenService.removeUser()
  }

  register(user) {
    return api.post("auth/register", {
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
