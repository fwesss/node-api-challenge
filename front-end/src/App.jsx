import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import theme from './theme'
import GetProjects from './features/projects/GetProjects'
import ViewProject from './features/projects/ViewProject'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
        <Route exact path="/projects" component={GetProjects} />
        <Route path="/projects/:id" component={ViewProject} />
      </Router>
    </ThemeProvider>
  )
}

export default App
