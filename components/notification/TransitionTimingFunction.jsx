import { useState, useEffect } from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Example(props) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setActive(props.active)
    }, 10)
  }, [props.active])
  if (props.successful) {
    return <div className={classNames(active ? "w-0" : "", "h-2 w-full bg-golemblue pb-2 ease-linear duration-5000")}></div>
  } else {
    return <div className={classNames(active ? "w-0" : "", "h-2 w-full bg-golemblue pb-2 ease-linear duration-5000")}></div>
  }
}
