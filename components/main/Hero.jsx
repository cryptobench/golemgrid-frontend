import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { motion } from "framer-motion"

export default function Example() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })

  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])
  return (
    <div className="bg-white" ref={ref}>
      <header className="relative overflow-hidden">
        {/* Hero section */}
        <div className=" py-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-6">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-golemblue">Golem Network</span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-4xl xl:text-6xl ">
                    Store and explore apps built for the future of the web.
                  </span>
                </h1>
                <p className="my-4 text-xl inline-block text-slate-600 sm:mt-5 ">
                  The Golem Network is providing a registry for your requestors images.
                </p>
                <div className="flex space-x-4 relative">
                  <Link href="/explore">
                    <a className="lg:mt-3 lg:col-span-4 col-span-12 md:col-span-12 text-center w-auto px-6 py-3 border border-transparent text-base lg:text-base font-medium rounded-md text-white bg-black shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                      Explore applications
                    </a>
                  </Link>
                  <Link href="/requestor">
                    <a className="lg:mt-3 lg:col-span-4 col-span-12 md:col-span-12 text-center w-auto px-6 py-3 text-base lg:text-base font-medium rounded-md text-gray-500 border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                      Read documentation
                    </a>
                  </Link>
                </div>
              </div>

              <div className="col-span-0 md:col-span-6 lg:col-span-6 md:grid lg:grid grid-cols-12 relative h-96 hidden md:visible"></div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
