import AllCards from "./componenets/AllCards";
import Header from "./componenets/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<AllCards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
/*
import AllCards from "./componenets/AllCards";
import Header from "./componenets/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <div>
      <Header></Header>
      <AllCards></AllCards>
    </div>
  );
  <Router>
            <div>
              <Routes>
                <Route path="/" element={<AllCards />} />
               </Routes>
            </div>
  </Router>
}

export default App;
*/