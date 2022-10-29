import React, { useState } from "react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx)
  if (session) {
    // Signed in

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "v1/blender/get/args/" + ctx.params.taskid, {
      method: "get",
      headers: {
        Authorization: "Bearer " + session.user.accessToken,
      },
    })
    const data = await res.json()
    if (res.status === 200) {
      return {
        props: {
          data: data,
          task_id: ctx.params.taskid,
        },
      }
    }

    // Pass data to the page via props
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Page({ data, task_id }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [args, setArgs] = useState(data)

  const submitForm = async (event) => {
    event.preventDefault()
    console.log(event)
    let data = new FormData()

    data.append("scene_file", event.target[0].files[0])
    const submit = await postFormData(process.env.NEXT_PUBLIC_API_BASE + "v1/submit/blender", "post", data)
    if (submit.status === 200) {
      let data = await submit.json()
      setSubmitted(true)
      router.push("/dashboard/task/blender/settings/" + data.task_id)
    }
  }

  return (
    <div className="mt-10 sm:mt-0 relative min-h-screen max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-3">
          <h1 className="font-bold text-4xl">We found these settings</h1>
          <div className="col-span-1">
            <p>{args.task_args.resolution_x}</p>
            <p>{args.task_args.resolution_y}</p>
            <p>Engine: {args.task_args.engine}</p>
            <p>Start frame: {args.task_args.start_frame}</p>
            <p>End frame: {args.task_args.end_frame}</p>
            <p>FPS: {args.task_args.framerate}</p>
            <p>Samples: {args.task_args.cycles_samples}</p>
            <p>Output format: {args.task_args.output_file_format}</p>
          </div>
        </div>
        <a href={"http://192.168.50.39/backend/v1/start/blender/" + task_id} className="bg-black text-white px-6 py-4">
          Start task
        </a>
      </div>
    </div>
  )
}

// This gets called on every request

export default Page
