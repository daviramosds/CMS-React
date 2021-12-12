import "./global.css";
import Routes from "./routes";
import Store from "./Store";

function App() {
  return (
    <div>
      <Store>
        <Routes />
      </Store>
    </div>
  );
}

export default App;
