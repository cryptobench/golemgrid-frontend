import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

async function refreshAccessToken(token, username) {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE + "api/token/refresh/"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ refresh: token }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const refreshedTokens = await res.json()
    if (!res.ok) {
      throw refreshedTokens
    }
    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: new Date().getTime() / 1000 + 3599, // add 300 seconds
      refreshTokenExpires: new Date().getTime() / 1000 + 86300,
      refreshToken: refreshedTokens.refresh ?? token.refresh, // Fall back to old refresh token
      username: username,
    }
  } catch (error) {
    return "/signin"
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "api/token/", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const user = await res.json()
        if (!res.ok) {
          throw new Error(user.detail)
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }

        // Return null if user data could not be retrieved
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account && user) {
        if (account.provider === "credentials") {
          return {
            ...token,
            accessToken: user.access_token,
            accessTokenExpires: new Date().getTime() / 1000 + 3599, // add 300 seconds
            refreshTokenExpires: new Date().getTime() / 1000 + 86300,
            refreshToken: user.refresh_token,
            username: user.user.username,
          }
        } else if (account.provider === "google") {
          var formdata = new URLSearchParams()
          formdata.append("access_token", account.access_token)
          formdata.append("id_token", account.id_token)
          const res = await fetch(process.env.BACKEND_GOOGLE_LOGIN_URL, {
            method: "POST",
            body: formdata,
          })

          if (!res.ok) {
            return false
          } else {
            var jwt = await res.json()
            return {
              ...token,
              accessToken: jwt.access_token,
              accessTokenExpires: new Date().getTime() / 1000 + 3599, // add 300 seconds
              refreshTokenExpires: new Date().getTime() / 1000 + 86300,
              refreshToken: jwt.refresh_token,
              username: jwt.user.username,
            }
          }
        } else if (account.provider === "github") {
          var formdata = new URLSearchParams()
          formdata.append("access_token", account.access_token)
          formdata.append("refresh_token", account.refresh_token)
          formdata.append("id_token", account.providerAccountId)
          const res = await fetch(process.env.BACKEND_GITHUB_LOGIN_URL, {
            method: "POST",
            body: formdata,
          })

          if (!res.ok) {
            return false
          } else {
            var jwt = await res.json()
            return {
              ...token,
              accessToken: jwt.access_token,
              accessTokenExpires: new Date().getTime() / 1000 + 3599, // add 300 seconds
              refreshTokenExpires: new Date().getTime() / 1000 + 86300,
              refreshToken: jwt.refresh_token,
              username: jwt.user.username,
            }
          }
        }
      }
      // If date is less than access expiration, then return token
      if (new Date().getTime() / 1000 < token.accessTokenExpires) {
        return token
      }
      // if its over the expiration date then we need to refresh
      else {
        // First check if refresh token expiration date is over
        if (new Date().getTime() / 1000 < token.refreshTokenExpires) {
          return refreshAccessToken(token.refreshToken, token.username)
        } else {
          return "/signin"
        }
      }
    },

    async session({ session, token, user }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.accessTokenExpires = token.accessTokenExpires
        session.user.refreshTokenExpires = token.refreshTokenExpires
        session.user.username = token.username
        return session
      } else {
        return "/signin"
      }
    },
  },
})
