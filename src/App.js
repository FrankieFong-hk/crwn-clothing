import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Route, Routes, Outlet } from "react-router-dom";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
        if(user){
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    })
    return unsubcribe;
  }, []);

  return (
    <Routes>
      <Route path='/crwn-clothing/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/crwn-clothingshop/*' element={<Shop />} />
        <Route path='/crwn-clothingauth' element={<Authentication />} />
        <Route path='/crwn-clothingcheckout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}
export default App;
