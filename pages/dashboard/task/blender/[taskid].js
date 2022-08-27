import React, { useState, useRef, useEffect } from "react"
import { getSession } from "next-auth/react"
import DashboardNav from "components/navs/DashboardNav"
import { useRouter } from "next/router"
import { getData } from "fetcher"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const skeletons = 4

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx)
  if (session) {
    // Signed in

    return {
      props: {},
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

function Page({}) {
  const router = useRouter()
  const [taskdata, setTaskData] = useState()
  const [loaded, setLoaded] = useState(false)
  const [subtaskdata, setSubtaskData] = useState()
  const [images, setImages] = useState()
  const [showNotification, setShowNotification] = useState({ successful: false, title: "", message: "", show: false })

  const fetch_task_data = async () => {
    let data = await getData(process.env.NEXT_PUBLIC_API_BASE + "v1/task/" + router.query.taskid, "get")
    let output = await data.json()
    setTaskData(output)
  }

  const fetch_subtask_data = async () => {
    let data = await getData(process.env.NEXT_PUBLIC_API_BASE + "v1/subtask/" + router.query.taskid, "get")
    let output = await data.json()
    setSubtaskData(output)
  }

  const fetch_task_data_and_subtask_data = async () => {
    let data = await getData(process.env.NEXT_PUBLIC_API_BASE + "v1/blender/subtask/results/" + router.query.taskid, "get")
    let output = await data.json()
    console.log(output)
    setImages(output)
    setLoaded(true)
  }

  useEffect(() => {
    if (router.query.taskid) {
      fetch_task_data()
      fetch_subtask_data()
      fetch_task_data_and_subtask_data()
      setInterval(() => {
        fetch_task_data()
        fetch_subtask_data()
        fetch_task_data_and_subtask_data()
      }, 5000)
    }
  }, [router.query.taskid])

  if (loaded) {
    return (
      <div className="relative min-h-screen pb-10">
        <DashboardNav></DashboardNav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative bg-white border-2 border-gray-100 rounded-lg grid grid-cols-12">
          <div className="col-span-12">
            <div class="flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="pb-5 border-b border-gray-200">
                    <div class="-ml-2 -mt-2 ">
                      <h3 class="ml-2 mt-2 text-2xl leading-6 font-medium text-gray-900">Blender Task</h3>
                      <p class="ml-2 mt-6 text-lg text-gray-500 truncate">
                        {taskdata.name}{" "}
                        <span
                          className={classNames(
                            taskdata.status == "Not Started" ? "text-red-500 bg-red-100" : "",
                            taskdata.status == "Started" ? "bg-gray-100" : "",
                            taskdata.status == "Computing" ? "text-yellow-500 bg-yellow-100" : "",
                            taskdata.status == "Finished" ? "text-green-500 bg-green-100" : "",
                            "inline-flex items-center px-2.5 py-0.5 mb-2  rounded-full text-xs font-medium "
                          )}
                        >
                          {taskdata.status}
                        </span>
                      </p>
                      <p class="ml-2 text-sm text-gray-500 truncate">{taskdata.unique_id}</p>
                    </div>
                  </div>
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Provider
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task Data
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {subtaskdata
                          ? subtaskdata.map((subtask, index) => {
                              return (
                                <tr>
                                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                    {subtask.provider}
                                  </td>
                                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{subtask.status}</td>
                                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{subtask.task_data}</td>
                                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{subtask.relationship}</td>
                                </tr>
                              )
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white col-span-12">
            <div class="mt-16">
              <h2 class="text-xl font-bold text-gray-900">Output</h2>

              <div class="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-12 xl:gap-x-8">
                {images.map((image, index) => {
                  return (
                    <div>
                      <div class="relative">
                        <div class="relative w-full rounded-lg overflow-hidden">
                          <img src={process.env.NEXT_PUBLIC_STATIC_URL + image.file} class="w-full h-full object-center object-cover" />
                        </div>
                        <div class="relative mt-4">
                          <h3 class="text-sm font-medium text-gray-900">output</h3>
                          <p class="mt-1 text-sm text-gray-500">test</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="relative min-h-screen pb-10">
        <DashboardNav></DashboardNav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative bg-white border-2 border-gray-100 rounded-lg grid grid-cols-12">
          <div className="col-span-12">
            <div class="flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="pb-5 border-b border-gray-200">
                    <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
                      <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">Blender Task</h3>
                      <p class="ml-2 mt-1 text-sm text-gray-500 truncate inline-block w-48">
                        <Skeleton className="inline-block"></Skeleton>
                      </p>
                    </div>

                    <span
                      className={classNames("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 w-20")}
                    >
                      <Skeleton></Skeleton>
                    </span>
                  </div>
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Provider
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task Data
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {[...Array(skeletons)].map((subtask, index) => {
                          return (
                            <tr>
                              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                <Skeleton></Skeleton>
                              </td>
                              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <Skeleton></Skeleton>
                              </td>
                              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <Skeleton></Skeleton>
                              </td>
                              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <Skeleton></Skeleton>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white col-span-12">
            <div class="mt-16">
              <h2 class="text-xl font-bold text-gray-900">Output</h2>

              <div class="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-12 xl:gap-x-8">
                {[...Array(skeletons)].map((image, index) => {
                  return <Skeleton height={64} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// This gets called on every request

export default Page
