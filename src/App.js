import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainPage from "./component/MainPage/MainPage";
import SearchResult from "./component/SearchResult/SearchResult";

class App extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={"/"} component={MainPage}/>
            <Route exact path={"/search-result"} component={SearchResult}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
