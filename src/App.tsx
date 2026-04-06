import type { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { ShowcaseApp } from "./playground/showcase/ShowcaseApp";

const App: FC = () => {
  return (
    <div className="h-full min-h-0">
      <BrowserRouter>
        <ShowcaseApp />
      </BrowserRouter>
    </div>
  );
};

export default App;
