import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import Leds from '../About/Leds';
import LedsSun from '../About/LedsSun';

function App() {
   return (
     <Router>
       <div className="App">
         <Switch>
           <Route path="/leds" component={Leds}/>
           <Route path="/ledsSun" component={LedsSun}/>
         </Switch>
       </div>
     </Router>
   );
}

export default App;
