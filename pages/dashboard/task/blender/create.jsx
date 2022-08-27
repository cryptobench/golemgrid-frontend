import React, { useState, useRef, useEffect } from "react"
import { getSession } from "next-auth/react"
import { postFormData } from "fetcher"
import { useRouter } from "next/router"
import { Switch } from "@headlessui/react"

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Page() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const submitForm = async (event) => {
    event.preventDefault()
    console.log(event)
    let data = new FormData()

    data.append("name", event.target[1].value)
    data.append("resolutionx", event.target[2].value)
    data.append("resolutiony", event.target[3].value)
    data.append("scene_file", event.target[0].files[0])
    data.append("borderleft", event.target[7].value)
    data.append("borderright", event.target[8].value)
    data.append("borderup", event.target[9].value)
    data.append("borderdown", event.target[10].value)
    data.append("output", event.target[6].value)
    data.append("frames", event.target[5].value)
    data.append("samples", event.target[4].value)
    const submit = await postFormData(process.env.NEXT_PUBLIC_API_BASE + "v1/submit/blender", "post", data)
    if (submit.status === 200) {
      let data = await submit.json()
      router.push("/dashboard/task/blender/" + data.task_id)
    }
  }

  return (
    <div className="mt-10 sm:mt-0 relative min-h-screen max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-3">
          <form
            onSubmit={(e) => {
              submitForm(e)
            }}
          >
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Scene file</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="mt-3">
                        <b>Selected file:</b> filename
                      </div>
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file" name="file" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="resolution_width" className="block text-sm font-medium text-gray-700">
                      Task name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="resolution_width" className="block text-sm font-medium text-gray-700">
                      Resolution Width
                    </label>
                    <input
                      type="number"
                      name="resolution_width"
                      id="resolution_width"
                      autoComplete="resolution_width"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="resolution_height" className="block text-sm font-medium text-gray-700">
                      Resolution Height
                    </label>
                    <input
                      type="number"
                      name="resolution_height"
                      id="resolution_height"
                      autoComplete="resolution_height"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="samples" className="block text-sm font-medium text-gray-700">
                      Samples
                    </label>
                    <input
                      type="number"
                      name="samples"
                      id="samples"
                      autoComplete="samples"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="frames" className="block text-sm font-medium text-gray-700">
                      Frames
                    </label>
                    <input
                      type="number"
                      name="frames"
                      id="frames"
                      autoComplete="frames"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="format" className="block text-sm font-medium text-gray-700">
                      Output Format
                    </label>
                    <select
                      id="format"
                      name="format"
                      autoComplete="format"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>PNG</option>
                      <option>EXIF</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-6"></div>
                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="borderleft" className="block text-sm font-medium text-gray-700">
                      Border left
                    </label>
                    <input
                      type="number"
                      name="borderleft"
                      id="borderleft"
                      autoComplete="borderleft"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="borderright" className="block text-sm font-medium text-gray-700">
                      Border right
                    </label>
                    <input
                      type="number"
                      name="borderright"
                      id="borderright"
                      autoComplete="borderright"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="borderup" className="block text-sm font-medium text-gray-700">
                      Border up
                    </label>
                    <input
                      type="number"
                      name="borderup"
                      id="borderup"
                      autoComplete="borderup"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="borderdown" className="block text-sm font-medium text-gray-700">
                      Border down
                    </label>
                    <input
                      type="number"
                      name="borderdown"
                      id="borderdown"
                      autoComplete="borderdown"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <div className="px-4 py-3 bg-gray-50 sm:px-6">
                  <button
                    // onclick set opposite of open
                    onClick={() => {
                      setOpen(!open)
                    }}
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// This gets called on every request

export default Page
