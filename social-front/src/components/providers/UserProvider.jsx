import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signin(signinData) {
    try {
      const reponse = await fetch('/api/users/signin', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(signinData)
      });
      const data = await reponse.json();
      setUser(data.user);
      return { success: true, message: "Connexion réussie." }
    } catch (err) {
      console.log(err);
      return { success: false, message: "L'email ou le mot de passe sont incorrectes" }
    }
  }

  return (
    <UserContext.Provider value={{ user, signin }}>{children}</UserContext.Provider>
  )
}
