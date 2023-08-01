import './App.css';
import {Route, Switch} from 'react-router-dom';
import landingPage from './components/landingPage/landingPage';
import Home from './components/home/home';
import DogDetail from './components/dogDetail/dogDetail';
import CreateDog from './components/createDog/createDog';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={landingPage}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/home/:id" component={DogDetail}/>
        <Route path="/dogs" component={CreateDog}/>
      </Switch>
    </div>
  );
}

export default App;
