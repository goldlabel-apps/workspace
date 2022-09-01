import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { 
  Grid,
  Container,
  createTheme, 
  ThemeProvider,
  CssBaseline,
} from "@mui/material"
import { featuresStore } from './features/featuresStore'
import { Sites } from "./features/Sites"
import { Banners } from "./features/Banners"
import { 
  Shared,
  TopMenu,
  theme,
} from "./features/Shared"

export const getFeaturesStore = () => { return featuresStore }

const root = ReactDOM.createRoot(
  document.getElementById('workspace') as HTMLElement
)

root.render(
  <React.Fragment>
    <Router>
      <Provider store={ featuresStore }>
        <ThemeProvider theme={createTheme(theme())}>
          <CssBaseline />
          <Container>
            <TopMenu />
            <Shared />
            <Grid container>
              <Switch>
                <Route path="/sites"
                  render={({ history }) => (
                      <Grid item xs={12}>
                        <Sites />
                      </Grid>
                  )} />
                <Route path="/banners"
                  render={({ history }) => (
                      <Grid item xs={12}>
                        <Banners />
                      </Grid>
                  )} />
                <Route exact path="/"
                  render={({ history }) => (
                    <React.Fragment>
                      <Grid item xs={12} md={6}>
                        <Banners />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Sites />
                    </Grid>
                  </React.Fragment>
                  )} />
              </Switch>
            </Grid>
          </Container>
        </ThemeProvider>
      </Provider>
      </Router>
  </React.Fragment>
)

