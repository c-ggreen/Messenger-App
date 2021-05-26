import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";
import Messenger from "./Components/Messenger";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/messenger" component={Messenger} />
      </div>
    </Router>
  );
}

export default App;
