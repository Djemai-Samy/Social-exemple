import Navbar from './components/layout/Navbar';
import AccueilPage from './components/pages/AccueilPage';
import AuthPage from './components/pages/AuthPage';
import ProfilPage from './components/pages/ProfilPage';
import UserProvider from './components/providers/UserProvider';
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <header>
          <Navbar />
          <h1 className='text-4xl text-center underline underline-offset-4 font-bold'>
            Réseau social
          </h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<AccueilPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profil" element={<ProfilPage />} />
          </Routes>
        </main>
      </UserProvider>
    </BrowserRouter>

  )
}

export default App
