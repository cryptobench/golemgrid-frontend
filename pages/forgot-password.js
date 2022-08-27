import { useState } from "react"
import Link from "next/link"

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  return {
    props: {},
  }

  // Pass data to the page via props
}

export default function Example() {
  const [sentemail, setSentemail] = useState(null)

  const signup = async (event) => {
    event.preventDefault() // don't redirect the page
    let url = process.env.NEXT_PUBLIC_API_BASE + "auth/reset-password"
    var formdata = new URLSearchParams()
    formdata.append("email", event.target.email.value)
    const reset_password = await fetch(url, {
      method: "post",
      body: formdata,
    })

    if (reset_password.status == 200) {
      setSentemail(true)
    } else {
      setSentemail(false)
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
              <h2 className="text-3xl font-extrabold text-gray-900">Reset your password</h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                {sentemail === null ? (
                  <form className="space-y-6" onSubmit={signup}>
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
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                ) : sentemail == true ? (
                  <div>
                    <p className="text-sm font-medium text-gray-700">We have sent you an email with a link to reset your password.</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Something went wrong trying to reset your password.</p>
                    <p className="text-sm font-medium text-gray-700">Please check your email and try again.</p>
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
