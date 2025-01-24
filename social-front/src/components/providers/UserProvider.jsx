import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";


export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const reponse = await fetch("/api/users/me", {
        credentials: 'include'
      });
      const data = await reponse.json()
      setUser(data);
    })();
  }, []);
  
  async function signin(signinData) {
    try {
      const reponse = await fetch('/api/users/signin', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(signinData)
      });

      if (reponse.status === 200) {
        const data = await reponse.json();
        setUser(data.user);
        return { success: true, message: "Connexion réussie." }
      }
      return { success: false, message: "Email ou mot de passe incorrecte." }

    } catch (err) {
      console.log(err);
      return { success: false, message: "Une erreur est survenue." }
    }
  }

  return (
    <UserContext.Provider value={{ user, signin }}>{children}</UserContext.Provider>
  )
}
