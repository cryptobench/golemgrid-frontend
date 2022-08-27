import { useState, useRef } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

export async function getStaticProps(ctx) {
  // Fetch data from external API

  return {
    props: {},
  }

  // Pass data to the page via props
}

export default function Example() {
  const [error, setError] = useState({ password: null, email: null, username: null })

  const signup = async (event) => {
    event.preventDefault() // don't redirect the page
    let url = process.env.NEXT_PUBLIC_API_BASE + "auth/register"

    const create_user = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
        password2: event.target.password2.value,
        email: event.target.email.value,
      }),
    })

    if (create_user.status == 201) {
      const returned_data = await create_user.json()
      const status = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/dashboard",
        username: event.target.username.value,
        password: event.target.password.value,
      })
    }
    if (create_user.status == 400) {
      const returned_data = await create_user.json()
      setError(returned_data)
    }
  }
  return (
    <>
      <div className="h-screen flex relative">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link href="/">
                <img className="h-12 mb-6 w-auto -ml-1 cursor-pointer" src="/golem.png" alt="Workflow" />
              </Link>
              <span className="block text-sm font-semibold uppercase tracking-wide text-golemblue">GolemGrid</span>
              <h2 className="text-3xl font-extrabold text-gray-900">Signup for an account</h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6" onSubmit={signup}>
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                      Repeat Password <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="password2"
                        name="password2"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {error.username ? (
                    <div>
                      <p className="inline-block font-bold">Username</p>{" "}
                      {Object.entries(error.username).map(([key, value], i) => (
                        <p className="text-red-500 font-semibold">{value}</p>
                      ))}
                    </div>
                  ) : null}
                  {error.email ? (
                    <div>
                      <p className="inline-block font-bold">Email </p>{" "}
                      {Object.entries(error.email).map(([key, value], i) => (
                        <p className="text-red-500 font-semibold">{value}</p>
                      ))}
                    </div>
                  ) : null}
                  {error.password ? (
                    <div>
                      <p className="inline-block font-bold">Password </p>{" "}
                      {Object.entries(error.password).map(([key, value], i) => (
                        <p className="text-red-500 font-semibold">{value}</p>
                      ))}
                    </div>
                  ) : null}

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign Up
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
