import instance from "./api"
import TokenService from "./token.service"
import router from "../router"

const setup = (store) => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()
      if (token) {
        config.headers["Authorization"] = "Bearer " + token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config
      if (originalConfig.url !== "api/token/" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const rs = await instance.post("api/token/refresh/", {
              refreshToken: TokenService.getLocalRefreshToken(),
            })

            const { accessToken } = rs.data

            store.dispatch("auth/refreshToken", accessToken)
            TokenService.updateLocalAccessToken(accessToken)

            return instance(originalConfig)
          } catch (_error) {
            store.dispatch("auth/logout")
            router.push({ name: "Login" })
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default setup
