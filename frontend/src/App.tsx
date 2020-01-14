import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './Navigator'


const Home: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello World negainoido!</h1>
    </div>
  );
}

const ICFPC2019: React.FC = () => {
  return (
    <div className="icfpc2019">
      <h1>negainoido ICFPC2019</h1>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Navigator />
        <Route exact path='/' component={Home} />
        <Route exact path='/icfpc2019' component={ICFPC2019} />
      </div>
    </BrowserRouter>
  );
}

export default App;
