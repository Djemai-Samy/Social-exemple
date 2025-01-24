import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";


export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const reponse = await fetch("/api/users/me", {
        credentials: 'include'
      });
      if (reponse.status === 200) {
        const data = await reponse.json()
        setUser(data);
      }
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

  async function uploadAvatar(file) {
    const form = new FormData();
    form.append('avatar', file);

    const reponse = await fetch('/api/users/profile', {
      method: "POST",
      credentials: "include",
      body: form
    });
    if (reponse.status === 200) {
      const data = await reponse.json();
      setUser(data.user)
    }

  }

  async function logout() {
    await fetch('/api/users/logout');
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, signin, logout, uploadAvatar }}>{children}</UserContext.Provider>
  )
}
