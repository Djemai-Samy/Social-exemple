import { useContext } from "react"
import { NavLink } from "react-router"
import { UserContext } from "../providers/UserContext"


export default function Navbar() {
  const { user } = useContext(UserContext);
  const links = [
    {
      label: "Accueil",
      path: "/"
    },
    {
      label: user ? "Profil" : "Authentification",
      path: user ? "/profil" : "/auth"
    }
  ]
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
