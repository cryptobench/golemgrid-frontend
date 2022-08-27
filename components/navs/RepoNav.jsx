function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Example(props) {
  const [tabs, setTabs] = useState(props.tabs)

  useEffect(() => null, [props.tabs])
  return (
    <div className="relative mb-8  rounded-lg">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link href={tab.href} key={tab.name}>
                <a
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "border-golemblue text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                  {tab.count ? (
                    <span
                      className={classNames(
                        tab.current ? "bg-indigo-100 text-black" : "bg-gray-100 text-gray-900",
                        "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                      )}
                    >
                      {tab.count}
                    </span>
                  ) : null}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
