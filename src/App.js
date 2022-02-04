import { Provider } from "react-redux";
import { NavBar } from "./Components/ui/NavBar";
import { NavBarUp } from "./Components/ui/NavBarUp";
import { DeshboardRoutes } from "./routers/DeshboardRoutes";
import { store } from "./store/store";


function App() {
  return (
    <div>
    <Provider store={store}>
        <NavBarUp/>
        <DeshboardRoutes />
    </Provider>
    </div>
  );
}

export default App;
