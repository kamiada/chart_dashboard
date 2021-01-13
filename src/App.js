import Header from './components/Header';
import Doughnut from './components/Doughnut';
import Barchart from './components/Barchart';
import RadarChart from './components/RadarChart';
import BubbleChart from './components/BubbleChart';
import Subpage from './components/Subpage';
import "./components/components.scss";
function App() {
  return (
    <div className="container">
      <Header />
      <Doughnut />
      <Barchart />
      <RadarChart />
      <BubbleChart />
    </div>
  );
}

export default App;
