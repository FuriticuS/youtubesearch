import "./App.css";
import Auth from "./Components/Auth/Auth";
import Main from "./Components/Main/Main";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path={["/", "/main"]} render={() => <Main />} />
                <Route exact path={"/sign-in"} render={() => <Auth />} />
            </Switch>
        </div>
    );
}

export default App;
