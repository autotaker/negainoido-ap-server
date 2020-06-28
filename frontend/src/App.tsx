import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './Navigator';
import Sample from './icfpc2020/App';

const Home: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello World negainoido!</h1>
    </div>
  );
}


const App: React.FC = () => {
  return (
      <BrowserRouter>
          <div>
              <Navigator />
              <Route path='/icfpc2019' component={Sample} />
              <Route exact path='/' component={Home} />
          </div>
      </BrowserRouter>
  );
};

export default App;
