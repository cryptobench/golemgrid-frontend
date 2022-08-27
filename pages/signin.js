import { useState } from "react"
import Router from "next/router"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { getSession } from "next-auth/react"

export async function getStaticProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    }
  } else {
    return {
      props: {},
    }
  }

  // Pass data to the page via props
}

export default function Example() {
  const [error, setError] = useState(false)
  const login = async (event) => {
    event.preventDefault() // don't redirect the page
    const status = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      username: event.target.username.value,
      password: event.target.password.value,
    })
    if (!status.error) {
      Router.push("/dashboard")
    }
    if (status.error) {
      setError(true)
    }
  }
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html className="h-full bg-white">
          <body className="h-full">
          ```
        */}
      <div className="h-screen flex relative">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link href="/">
                <img className="h-12 mb-6 w-auto -ml-1 cursor-pointer" src="/golem.png" alt="Workflow" />
              </Link>
              <span className="block text-sm font-semibold uppercase tracking-wide text-golemblue">GolemGrid</span>
              <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Sign in with</p>

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <a
                        tabIndex="1"
                        onClick={() => {
                          signIn("google")
                        }}
                        className="w-full hover:cursor-pointer inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Google</span>
                        <img src="/google_login.png" className="w-5 h-5"></img>
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Facebook</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        onClick={() => {
                          signIn("github")
                        }}
                        className="w-full cursor-pointer inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with GitHub</span>
                        <svg className="w-5 h-5 text-black" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={login} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-golemblue focus:border-golemblue sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-golemblue focus:border-golemblue sm:text-sm"
                      />
                    </div>
                  </div>
                  {error ? (
                    <div>
                      <p className="text-red-500 font-semibold text-center">Username or password didn't match.</p>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Link href="/signup">
                        <a href="/signup" className="font-medium text-golemblue hover:text-indigo-500">
                          Don't have an account?
                        </a>
                      </Link>
                    </div>

                    <div className="text-sm">
                      <Link href="/forgot-password">
                        <a href="/forgot-password" className="font-medium text-golemblue hover:text-indigo-500">
                          Forgot your password?
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white text-sm font-medium bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
