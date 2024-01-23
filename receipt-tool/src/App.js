import './App.css'; 
import Search from './components/Search';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';

function App() {
  return (
    <main> 
      <Search />
      {/* <Favorites /> */}
      <Meals />
      {/* <Modal /> */}
    </main>
  );
}

export default App;
