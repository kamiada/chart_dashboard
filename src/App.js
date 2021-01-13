import './App.css';
import Header from './components/Header';
import Doughnut from './components/Doughnut';
import Barchart from './components/Barchart';
import Subpage from './components/Subpage';
function App() {
  return (
    <div className="App">
      <Header />
      <Doughnut />
      <Barchart />
    </div>
  );
}

export default App;
