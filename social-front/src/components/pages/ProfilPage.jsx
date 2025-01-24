import { useContext } from "react"
import { UserContext } from "../providers/UserContext";
export default function ProfilPage() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <div>
        {user?.email}
      </div>
    </div>
  )
}
