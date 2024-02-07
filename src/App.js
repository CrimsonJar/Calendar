// import logo from "./logo.svg";
import "./App.css";
import Calendar from "./Calendar";

function App() {
  const now = new Date();
  console.log('test')
  // const now = new Date(2024, 0, 18);
  // const now = new Date(2017, 2, 8);

  return <Calendar date={now} />;
}

export default App;
