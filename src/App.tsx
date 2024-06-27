import { CountryCapitalGame } from "./components/CountryCapitalGame";

function App() {
  const data = {
    VietNam: "HaNoi",
    Germany: "Berlin",
    USA: "Washington",
  };

  return <CountryCapitalGame data={data} />;
}

export default App;
