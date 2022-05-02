import './App.css';
import { BrowserRouter,Routes,
  Route, } from "react-router-dom";
  import LoginSignupButton from './LoginSignupButton'
  import Login from './Login'
  import Signup from './Signup'
  import Home from './Home'
  import ListDetails from './Listdetails'
function App() {
  return (
    <div className="App">
         <header>
        MOVIES WORLD
      </header>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginSignupButton/>}/>
      <Route path="login" element={<Login/>}  />
      <Route path="signup" element={<Signup/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="/listid/:id" element={<ListDetails/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
