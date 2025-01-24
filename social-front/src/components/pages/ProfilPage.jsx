import { useContext } from "react"
import { UserContext } from "../providers/UserContext";
import { useNavigate } from "react-router";
export default function ProfilPage() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  if (!user) {
    navigate('/auth')
  }

  return (
    <div>
      <div>
        {user?.email}
      </div>
    </div>
  )
}
