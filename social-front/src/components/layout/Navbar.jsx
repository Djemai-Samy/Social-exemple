import { useContext } from "react"
import { NavLink } from "react-router"
import { UserContext } from "../providers/UserContext"
import Button from "../ui/Button";


export default function Navbar() {
  const { user, logout } = useContext(UserContext);
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

        {user && (
          <li>
            <Button onClick={logout}>Déconnexion</Button>
          </li>
        )}
      </ul>
    </nav>
  )
}
