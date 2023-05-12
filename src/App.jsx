import "./styles/styles.scss"
import "./firebase/config"
import { RooterPrincipal } from "./rooter/RooterPrincipal"
import { contextUser } from "./context/contextUser"
import { useAuth } from "./hooks/useAuth"

function App() {
   const authFunctions = useAuth()

   return (
      <contextUser.Provider value={authFunctions}>
         <RooterPrincipal />
      </contextUser.Provider>
   )
}

export default App
