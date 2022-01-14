import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import SignUp from "component/SignUp";
import SignIn from "component/SignIn";
import User from "component/User";
import NotFound from "component/NotFound";
import Start from "component/Start";
import user from "reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });
export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
