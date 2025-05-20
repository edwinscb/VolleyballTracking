import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { LanguageProvider } from "./context/LanguageContext"; 
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
function App() {
  return (
    <LanguageProvider>
      <Router>
        <NavBar/>
      </Router>
    </LanguageProvider>
  );
}
export default App;