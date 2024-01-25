import Page from "./Page";
import { MovieContext, ThemeContext } from "./context";

import { useState, useReducer } from "react";

import { cartReducer, initialState } from "./reducers/CartReducer";

const App = () => {
  // const [cartData, setCartData] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <MovieContext.Provider value={{ state, dispatch }}>
        {/* <MovieContext.Provider value={{ cartData, setCartData }}> */}
        <Page />
      </MovieContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
