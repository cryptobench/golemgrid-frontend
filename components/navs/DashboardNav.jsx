import React, { useState, useEffect } from "react"
import { Popover } from "@headlessui/react"
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
} from "@heroicons/react/outline"
import Link from "next/link"

const solutions = [
  {
    name: "Requestor",
    description: "Get a better understanding of where your traffic is coming from.",
    href: "/requestor",
    icon: ChartBarIcon,
  },
  {
    name: "Requestor Portal",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  { name: "Provider", description: "Your customers' data will be safe and secure.", href: "/provider", icon: ShieldCheckIcon },
  {
    name: "Golem Analytics",
    description: "Connect with third-party tools that you're already using.",
    href: "https://stats.golem.network",
    icon: ViewGridIcon,
  },
  {
    name: "Thorg",
    description: "Build strategic funnels that will drive your customers to convert",
    href: "https://thorg.io",
    icon: RefreshIcon,
  },
  {
    name: "Square",
    description: "Get detailed reports that will help you make more informed decisions ",
    href: "#",
    icon: DocumentReportIcon,
  },
  {
    name: "Blog",
    description: "Get detailed reports that will help you make more informed decisions ",
    href: "/blog",
    icon: DocumentReportIcon,
  },
]

const requestor = [
  {
    name: "Requestor Portal",
    description: "Monitor spendings from the applications you deploy",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "SDK Documentation",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Examples & Tutorials",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Golem Analytics",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
]

const provider = [
  {
    name: "Documentation",
    description: "Monitor spendings from the applications you deploy",
    href: "#",
    icon: ChartBarIcon,
  },

  {
    name: "Examples & Tutorials",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Golem Analytics",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
  {
    name: "Plugins",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
]

const about = [
  {
    name: "Roadmap",
    description: "Follow Golem on the journey to a decentralized web",
    href: "#",
    icon: ChartBarIcon,
  },

  {
    name: "Team",
    description: "See the Golem team",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Job Offerings",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
  {
    name: "Plugins",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Navbar = () => {
  return (
    <nav className="relative bggridbottom  w-full h-32 ">
      <Popover className="relative max-w-7xl mx-auto flex items-center justify-between ">
        <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div>
            <Link href="/">
              <a className="flex">
                <span className="sr-only">Workflow</span>
                <img className="h-12 w-auto sm:h-14 mt-2   rounded-lg" src="https://i.imgur.com/zcL5vPX.png" alt="" />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <Link href={"/dashboard"}>
                <a
                  href="/dashboard"
                  className={classNames(
                    "active" == "e" ? "text-gray-900" : "text-gray-500",
                    "group cursor-pointer rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  )}
                >
                  <span>Dashboard</span>
                </a>
              </Link>
            </Popover.Group>
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/signout">
            <button className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
              Sign out
            </button>
          </Link>
        </div>
      </Popover>
    </nav>
  )
}

export default Navbar
