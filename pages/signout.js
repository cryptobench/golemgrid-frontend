import DashboardNav from "components/navs/DashboardNav"
import { signOut } from "next-auth/react"

export default function Custom404() {
  return (
    <>
      <DashboardNav></DashboardNav>

      <div className="bg-white">
        <header className="relative overflow-hidden">
          <div className=" py-24">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
              <div className="grid grid-cols-12">
                <div className="col-span-12 text-center ">
                  <h1>
                    <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-4xl xl:text-4xl ">
                      Are you sure you wish to sign out?
                    </span>
                  </h1>
                  <button
                    onClick={() => signOut()}
                    className="lg:mt-4 lg:col-span-4 col-span-12 md:col-span-12 text-center w-auto px-6 py-3 border border-transparent text-base lg:text-base font-medium rounded-md text-white bg-black shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                  >
                    Sign me out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
