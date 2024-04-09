import logo from './logo.svg';
import './App.css';
import Home from './components/components/Home';
import HomeT from './Truefalse/Home'
import McqTL from './McqTL';

function App() {
  return (
    <div className="App">
      <McqTL/>
          <HomeT/>
         {/*  <Home/> */}
    </div>
  );
}

export default App;
