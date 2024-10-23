import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import BookDetails from "./components/BookDetails";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BookList} />
        <Route path="/add-book" component={BookForm} />
        <Route path="/edit-book/:id" component={BookForm} />
        <Route path="/book-details/:id" component={BookDetails} />
      </Switch>
    </Router>
  );
};

export default App;
