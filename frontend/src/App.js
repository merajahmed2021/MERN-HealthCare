import React, { Component,useEffect,useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

// Home Route
import Home from './containers/Home/Home';
import Routes from './hocs/Routes';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authactions';
import Layout from './hocs/Layout';

// import L from 'leaflet';
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

const App = () =>{

  useEffect(() => {
    store.dispatch(loadUser());
    
  }, [])

    return (      
      <Provider store={store}>
        <Router>
          <Layout >
             <Route path="/"             component={Home} exact/>
             <Route component={Routes} />
            </Layout>
        </Router>
      </Provider>
    );
}
 
export default App;