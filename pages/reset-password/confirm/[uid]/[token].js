import { useState } from "react"
import Link from "next/link"

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  return {
    props: {
      uid: ctx.params.uid,
      token: ctx.params.token,
    },
  }

  // Pass data to the page via props
}

export default function Example({ uid, token }) {
  const [error, setError] = useState(null)
  const [reset, setReset] = useState(null)

  const reset_password = async (event) => {
    event.preventDefault() // don't redirect the page
    let url = process.env.NEXT_PUBLIC_API_BASE + "reset-password/confirm/" + uid + "/" + token + "/"

    const reset = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        new_password1: event.target.password1.value,
        new_password2: event.target.password2.value,
        uid: uid,
        token: token,
      }),
    })

    if (reset.status == 200) {
      setReset(true)
    }
    if (reset.status == 400) {
      const returned_data = await reset.json()
      setError(returned_data)
      console.log(returned_data)
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
              <span className="block text-sm font-semibold uppercase tracking-wide text-golemblue">Golem Registry</span>
              <h2 className="text-3xl font-extrabold text-gray-900">Reset your password</h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                {reset === null ? (
                  <form className="space-y-6" onSubmit={reset_password}>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="password1"
                          name="password1"
                          type="password"
                          autoComplete="new-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                        Repeat New Password <span className="text-red-500">*</span>
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
                    {error
                      ? Object.entries(error).map(([key, value]) => (
                          <p className="text-red-500 font-semibold">
                            {key}: {value}
                          </p>
                        ))
                      : null}

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                ) : reset === true ? (
                  <div>
                    <p>Your password has been reset. You can now sign in.</p>
                    <Link href="/signin">
                      <a className="w-full my-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white text-sm font-medium bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-500 font-semibold">Something went wrong. Please try again.</p>
                  </div>
                )}
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
