import { useContext, useEffect, useState } from "react"
import { UserContext } from "../providers/UserContext";
import { useNavigate } from "react-router";
import UserDetails from "../containers/UserDetails";
import UserDetailsForm from "../forms/UserDetailsForm";
import Button from "../ui/Button"
export default function ProfilPage() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [isEditingDetails, setIsEditingDetails] = useState(false)

  const toggleEditingDetails = () => {
    setIsEditingDetails(!isEditingDetails);
  }

  if (!user) {
    return navigate('/auth')
  }

  return (
    <div>
      {isEditingDetails ? <UserDetailsForm user={user} /> : <UserDetails user={user} />}
      <Button onClick={toggleEditingDetails}>Modifier vos informations</Button>
    </div>
  )
}
