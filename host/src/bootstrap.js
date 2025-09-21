import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import mfeConfig from "../mfe.json";
import { loadRemoteScript } from "./loader";

async function loadComponent(scope, module) {
  // Initializes the shared scope
  await __webpack_init_sharing__("default");

  const container = window[scope];
  if (!container) throw new Error(`Remote container ${scope} not found on window`);

  // Initialize the container
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(module);
  return factory();
}

async function init() {
  const routes = await Promise.all(
    Object.entries(mfeConfig).map(async ([scope, { url, expose, route }]) => {
      await loadRemoteScript(scope, url);
      const Component = React.lazy(() => loadComponent(scope, expose));

      return (
        <Route
          key={scope}
          path={route}
          render={() => (
            <React.Suspense fallback={<div>Loading {scope}...</div>}>
              <Component />
            </React.Suspense>
          )}
        />
      );
    })
  );

  ReactDOM.render(
    <Router>
      <Switch>
        {routes}
        <Route render={() => <h2>Not Found</h2>} />
      </Switch>
    </Router>,
    document.getElementById("root")
  );
}

init();
