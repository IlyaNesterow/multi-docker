import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Fib from './Fib'
import OtherPage from './OtherPage'


const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/other_page">Other page</Link>
      </nav>
      <Route exact path="/" component={ Fib }/>
      <Route path="/other_page" component={ OtherPage }/>
    </Router>
  )
}

export default App
