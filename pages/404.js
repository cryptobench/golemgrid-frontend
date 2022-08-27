import NormalNav from "components/navs/NormalNav"
import Link from "next/link"

export default function Custom404() {
  return (
    <>
      <NormalNav></NormalNav>

      <div className="bg-white">
        <header className="relative overflow-hidden">
          <div className=" py-24">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
              <div className="grid grid-cols-12">
                <div className="col-span-12 text-center ">
                  <h1>
                    <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-4xl xl:text-6xl ">404 Page not found</span>
                  </h1>
                  <div className="mt-8">
                    <Link href="/">
                      <a
                        href="/"
                        className="lg:mt-3 lg:col-span-4 col-span-12 md:col-span-12 text-center w-auto px-6 py-3 border border-transparent text-base lg:text-base font-medium rounded-md text-white bg-black shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                      >
                        Take me to the home page
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
