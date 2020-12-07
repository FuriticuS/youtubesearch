import Auth from "./Components/Auth/Auth";
import Main from "./Components/Main/Main";
import { Route, Switch } from "react-router-dom";
import Select from "./Components/Select/Select";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path={["/", "/main"]} render={() => <Main />} />
                <Route exact path={"/sign-in"} render={() => <Auth />} />
                <Route exact path={"/select"} render={() => <Select />} />
            </Switch>
        </div>
    );
}

export default App;
