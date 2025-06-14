# React Native Theme Provider

A theme abstraction over React Native [StyleSheet](https://reactnative.dev/docs/stylesheet.html).



Nested Theme Support

## Usage

#### Step 1

Install [`react-native-theme-provider`](https://www.npmjs.com/package/@material-native-ui/theme-provider) using:

[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
```
npm install @material-native-ui/theme-provider
```
[pnpm](https://pnpm.io/installation)
```
pnpm install @material-native-ui/theme-provider
```

[yarn](https://classic.yarnpkg.com/lang/en/docs/install) 
```
yarn add @material-native-ui/theme-provider
```

#### Step 2

Wrap your App with a theme provider.

```jsx harmony
import React from "react";
import { ThemeProvider } from "@material-native-ui/theme-provider";

const defaultTheme = {
    spacing: (spacing) => 8 * spacing,
}


const themes = {
  light: {
    ...defaultTheme,
    name: "light",
    // some light theme properties
    palette: {
        default: 'rgba(100, 100, 100, .5)',
        primary: '#40A3D0',
        secondary: '#F5FF62',
    }
  },
  dark: {
    ...defaultTheme,
    name: "dark",
    // some dark theme properties
    palette: {
        default: 'rgba(200, 200, 200, .5)',
        primary: '#ffbb00',
        secondary: '#ff6501',
    }
  }
};

class App extends React.Component {
  state = {
    currentTheme: themes.light
  };

  changeTheme = () => {
    const { name } = this.state.currentTheme;
    const nextTheme = name === "light" ? themes.dark : themes.light;
    this.setState({
      currentTheme: nextTheme
    });
  };

  render() {
    const { currentTheme } = this.state;
    return (
      <ThemeProvider theme={currentTheme}>
        <App changeTheme={this.changeTheme} />
      </ThemeProvider>
    );
  }
}
```
#### Step 3

```jsx harmony
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import StyleSheet, { withStyles } from '@material-native-ui/theme-provider'

class App extends Component {
  render() {
    const { styles, changeTheme } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Awesome Theme Provider</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={changeTheme('dark')}>
            <Text>dark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={changeTheme('light')}>
            <Text>light</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create(
  (theme) => ({
    container: {
      flexGrow: 1,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    button: {
      borderRadius: 5,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: theme.palette.default,
    },
    actions: {
      flexDirection: 'row',
    },
  })
)
export default withStyles(style)(App)
```
### Nested Theme

```jsx harmony
        <ThemeProvider theme={themes.green}>
            <Button color={'primary'} text="Submit" />
            <ThemeProvider theme={themes.blue}>
              <Button color={'primary'} text="Submit" />
            </ThemeProvider>
        <ThemeProvider theme={themes.light}>
```

### useStyle hook
```jsx harmony
import React, { Component } from 'react'
import StyleSheet, { useStyle } from '@material-native-ui/theme-provider'

const style = StyleSheet.create(
  (theme) => ({
    container: {
      flexGrow: 1,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },   
  })
)
const App = function({ children }) {
    const style = useStyle(style)
    
    return (
      <View style={styles.container}>
            {/* content */}
      </View>
    )
}
```

### withTheme props
```jsx harmony

import React, { Component } from 'react'
import  { withTheme } from '@material-native-ui/theme-provider'
import {
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';

class App extends Component {
  render() {
    const { styles, theme } = this.props
    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: theme.palette.primary,
      },
    };
    return (
      <NavigationContainer theme={MyTheme}>
            {/* content */}
      </NavigationContainer>
    )
  }
}

export default withTheme(App)
```

### useTheme hook
```jsx harmony
import React, { Component } from 'react'
import {
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
const App = function({ children }) {
    const theme = useTheme()
    const MyTheme = { //send theme to react navigation theme
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: theme.palette.primary,
      },
    };
    return (
      
      <NavigationContainer theme={MyTheme}> 
            {/* content */}
      </NavigationContainer>
    )
}
```

### with type script

```tsx harmony
import React, { Component } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import StyleSheet, { withStyles } from '@material-native-ui/theme-provider'

interface InterfaceStyles {
  container: ViewStyle
  button: ViewStyle
  actions: ViewStyle
  title: TextStyle
}

interface InterfaceProps {
  styles: InterfaceStyles
  changeTheme: Function
}

class App extends Component<InterfaceProps> {
  render() {
    const { styles, changeTheme } = this.props
    return (
      <View style={styles.container}>
        // children
      </View>
    )
  }
}

const style = StyleSheet.create(
  (theme): InterfaceStyles => ({
    //styles
  })
)
export default withStyles(style)(App)


```

#### customize

Use it in your components.

```jsx
import Theme, { StylesConsumer, withStyles } from "@material-native-ui/theme-provider";

// with theme
const style = Theme.create((theme) => ({
  container: {
    color: theme.textColor,
    // Theme inherits all properties from StyleSheet
    ...Theme.absoluteFillObject,
  }
}));

// or without theme
const style = Theme.create({
  color: "blue",
});

// or create a stylesheet directly
// but do not pass this to style prop on consumer/hoc
const stylesheet = Theme.sheet({
  color: "blue",
})

// as consumer
const ThemedText = (props) => (
  <StylesConsumer style={style}>
    {(styles) => (
      <Text {...props} styles={styles} />
    )}
  </StylesConsumer>
);

export default ThemedText;

// or as hoc
const ThemedText = (({ styles, ...props }) => (
  <Text {...props} styles={styles} />
));

export default withStyles(style)(ThemedText);
```


## Road map

|  state | react-native  | react-native-web  |   
|---|---|---|
| fork from react-native-paint  | ✅ | ✅ |  
| provide theme as props  |  ✅ | ✅ |   
| useStyle hook  |  ✅ | ✅ |  
| useTheme hook | ✅ | ✅ |
| reWrite with type script |   |   |   


Big thanks to @brankeye and @soroushm for the great work!


# Example
- [native project](https://github.com/material-native-ui/theme-provider/tree/master/samples/native-app) 
- [web project](https://github.com/material-native-ui/theme-provider/tree/master/samples/web-app)
