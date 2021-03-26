import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'; 

import './App.css'
import NewComics from './ComicsLists/ComicList';
import TopBar from './Menu';
import NewItem from './ComicsLists/NewItem';
import Basket from './ComicsLists/Basket';
import Search from './Search'
function App() {
  
  return (
    <div className="App">
      <section>
        <TopBar/>
        <Router>
          <Link to="/ComicList"></Link>
          <Link to='/NewItem'></Link>
          <Link to='/Basket'></Link>
          <Link to='/Search'/>

          <Route exact path="/" render={() => {
            return <Redirect to='/ComicList'/>
          }} />

          <Route exact path="/ComicList" render={() => {
            return (
              <div>
                <h1 className='Title'>Comic List</h1>
            <NewComics/> 
            </div>
            )
          }}/>
          <Route exact path="/NewItem" render={() => {
            return <NewItem/> 
          }}/>
           <Route exact path="/Basket" render={() => {
            return (
              <div>
                <h1 className='Title'>Basket</h1>
            <Basket/> 
            </div>
            ) 
          }}/>
          <Route exact path="/Search" render={() => {
            return (
              <div>
                <h1 className='Title'>Search</h1>
            <Search/> 
            </div>
            ) 
          }}/>
        </Router>
      </section>
    </div>
  );
}

export default App;
