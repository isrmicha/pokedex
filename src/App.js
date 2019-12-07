import React from 'react'
import Store from './store'
import { Provider } from 'react-redux'
import { Home } from './containers'
export const App = () => (
  <Provider store={Store}>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <Home />
  </Provider>
)

export default App
