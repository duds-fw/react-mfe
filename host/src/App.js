import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// ...
ReactDOM.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  </React.Suspense>,
  document.getElementById("root")
);
