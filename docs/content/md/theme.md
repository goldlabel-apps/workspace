## Theme Feature

> Extends use of Material UI to allow easy custom theming of components and a centralised Icon component. Material UI has a [default theme](https://mui.com/material-ui/customization/default-theme/) which can be partly or wholly overridden by use of `createTheme` and  `ThemeProvider`.

#### Theme Usage

We can have multiple themes and event nest. It is also where we can start to implement light/dark modes. To implement, we simply create a custom theme object and wrap the part of our app we want to apply with ThemeProvider

```javascript
import { getDesignTokens } from "./mui-theme"
import { createTheme, ThemeProvider } from '@mui/material'

<ThemeProvider theme={createTheme(getDesignTokens('light'))}>
  <App />
</ThemeProvider>
```

#### Icon Component

`./mui-theme/Icon.tsx` is a useful component which allows us to use an Icon anywhere in the app. It simply imports a lot of MUI Icons and exports one according to a parameter it gets passed like this

```javascript
import { Icon } from "./mui-theme"

<Icon icon="settings" />
```

There are a lot of predefined icons already available and adding new ones is easy. There is also a mechanism for adding SVG graphics which are not part of the MUI Icon set to create completely custom icons
