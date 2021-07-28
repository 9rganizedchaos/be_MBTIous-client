import React from 'react';
import {BrowserRouter as Switch, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ArtistsPage from "./pages/ArtistsPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";

const initialState = {
  answers1: [0, 0, 0, 0, 0],
  answers2: [0, 0, 0, 0, 0],
  answers3: [0, 0, 0, 0, 0],
  answers4: [0, 0, 0, 0, 0],
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/artists">
          <ArtistsPage />
        </Route>
        <Route exact path="/test">
          <TestPage />
        </Route>
        <Route exact path="/result">
          <ResultPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
