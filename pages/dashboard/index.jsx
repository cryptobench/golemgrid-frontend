import React, { useState, useRef, useEffect } from "react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx)
  if (session) {
    // Signed in
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "v1/tasks/all", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + session.user.accessToken,
      }),
    })
    const data = await res.json()
    return {
      props: {
        data: data,
      },
    }
  } else {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    }
  }

  // Pass data to the page via props
}

function Page({ data }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState(data)
  console.log(data)

  return (
    <div className="mt-10 sm:mt-0 relative min-h-screen max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <a
          href="/dashboard/task/blender/create"
          className="mt-3 w-full col-span-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
        >
          Create task
        </a>
        {tasks.map((task, index) => (
          <a href={"/dashboard/task/blender/" + task.unique_id} className="bg-white shadow h-64 rounded-xl p-8" key={index}>
            <img src="https://www.blender.org/wp-content/uploads/2020/07/blender_logo.png"></img>
            <p className="text-lg mt-4 block">
              {task.name}{" "}
              <span
                className={classNames(
                  task.status == "Not Started" ? "text-red-500 bg-red-100" : "",
                  task.status == "Started" ? "bg-gray-100" : "",
                  task.status == "Computing" ? "text-yellow-500 bg-yellow-100" : "",
                  task.status == "Finished" ? "text-green-500 bg-green-100" : "",
                  "inline-flex items-center px-2.5 py-0.5 mb-2  rounded-full text-xs font-medium "
                )}
              >
                {task.status}
              </span>
            </p>
            <p className="text-xs">{task.unique_id}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

// This gets called on every request

export default Page
