import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { LanguageProvider } from "./context/LanguageContext"; 
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
function App() {
  return (
    <LanguageProvider>
      <Router>
        <NavBar/>
        <Footer/>
      </Router>
    </LanguageProvider>
  );
}
export default App;