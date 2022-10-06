// import logo from './logo.svg';
// import './App.css';

import Header from "./Components/header";
import Main from "./Containers/main";
import Footer from "./Containers/footer";

function App() {
  return (
    <div className="todo-app__root">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
