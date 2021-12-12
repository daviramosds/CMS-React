import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import EditSingle from "./pages/EditSingle";
import NewPost from "./pages/NewPost";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/edit/:id" exact component={EditSingle} />
      <Route path="/new/" exact component={NewPost} />
    </BrowserRouter>
  );
}

export default Routes;
