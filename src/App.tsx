import { useState } from 'react';
import {BrowserRouter as Switch, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ArtistsPage from "./pages/ArtistsPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import { ThemeProvider } from 'styled-components';
import { pinkTheme, violetTheme } from "./assets/styles/theme";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { updateColor, updateSize } from './action/actions';
import { useEffect } from 'react';
import groupsArr from './assets/groups';

interface Member {
  name: string;
  mbti: string;
}

interface Group {
  name: string;
  code: string;
  mbti: string;
  fitMe: object;
  memeber: Member[];
  albumCover: number;
  slogan: string;
  percent: number;
  description: string[];
}

function App() {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { color } = viewState;
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(violetTheme);
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: Group) => item.mbti === myMBTI)[0];

  const handleThemeChange = () => {
    setTheme(theme === violetTheme ? pinkTheme : violetTheme);
    if(color === "violet"){
      dispatch(updateColor("pink"));
    } else {
      dispatch(updateColor("violet"));
    }
  }

  const handleSizeChange = () => {
    if(window.innerWidth > 1024){
      dispatch(updateSize("PC"));
    } else if (window.innerWidth > 768){
      dispatch(updateSize("tablet"));
    } else {
      dispatch(updateSize("mobile"));
    }
  }

  useEffect(() => {
    window.addEventListener("load", handleSizeChange);
    window.addEventListener("resize", handleSizeChange);
    dispatch(updateColor("violet"));
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage handleThemeChange={handleThemeChange} />
        </Route>
        <Route exact path="/artists">
          <ArtistsPage />
        </Route>
        <Route exact path="/test">
          <TestPage handleThemeChange={handleThemeChange}/>
        </Route>
        <Route exact path="/result">
          <ResultPage myKpopGroup={myKpopGroup} handleThemeChange={handleThemeChange}/>
        </Route>
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
