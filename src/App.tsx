import React, { useState } from 'react';
import {BrowserRouter as Switch, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ArtistsPage from "./pages/ArtistsPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import { ThemeProvider } from 'styled-components';
import { pinkTheme, violetTheme } from "./assets/styles/theme";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { updateColor } from './action/viewAction';

function App() {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { color, view } = viewState;
  console.log(color, view);
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(violetTheme);
  const handleThemeChange = () => {
    setTheme(theme === violetTheme ? pinkTheme : violetTheme);
    if(color === "violet"){
      dispatch(updateColor("pink"));
    } else {
      dispatch(updateColor("violet"));
    }
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
          <TestPage handleThemeChange={handleThemeChange}/>
        </Route>
        <Route exact path="/result">
          <ResultPage handleThemeChange={handleThemeChange}/>
        </Route>
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
