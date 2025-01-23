import { NavLink } from "react-router"

const links = [
  {
    label: "Accueil",
    path: "/"
  },
  {
    label: "Authentification",
    path: "/auth"
  }
]
export default function Navbar() {
  return (
    <nav>
      <ul className="flex bg-neutral-900 gap-2 p-4">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink to={link.path}>{link.label}</NavLink>
          </li>))}
      </ul>
    </nav>
  )
}
