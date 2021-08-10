import React, { useState } from 'react';
import {BrowserRouter as Switch, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ArtistsPage from "./pages/ArtistsPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import { createContext } from 'react';
import { useReducer } from 'react';
import { useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { pinkTheme, violetTheme } from "./assets/styles/theme";

function App() {
  const [theme, setTheme] = useState(violetTheme);
  const handleThemeChange = () => {
    setTheme(theme === violetTheme ? pinkTheme : violetTheme);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage handleThemeChange={handleThemeChange}/>
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
    </ThemeProvider>
  );
}

export default App;
