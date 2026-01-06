import ReactDOM from "react-dom/client";
import Header from "./components/header/header.jsx";
import Body from "./components/home/home.jsx";
const App = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(App());
