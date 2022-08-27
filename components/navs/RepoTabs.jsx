export default function Example(repository_name, tags_count, collaborator_count, route_path) {
  const check_path_matches = (path) => {
    if (route_path.includes(path)) {
      return true
    } else {
      return false
    }
  }
  return [
    {
      name: "General",
      href: "/dashboard/repository/" + repository_name,
      current: route_path === "/dashboard/repository/[repository]" ? true : false,
    },
    {
      name: "Tags",
      href: "/dashboard/repository/" + repository_name + "/tags",
      count: tags_count,
      current: check_path_matches("tags") ? true : false,
    },
    { name: "Builds", href: "#", count: "0", current: check_path_matches("builds") ? true : false },
    {
      name: "Collaborators",
      href: "/dashboard/repository/" + repository_name + "/collaborators",
      count: collaborator_count,
      current: check_path_matches("collaborators") ? true : false,
    },
    {
      name: "Settings",
      href: "/dashboard/repository/" + repository_name + "/settings",
      current: check_path_matches("settings") ? true : false,
    },
  ]
}
