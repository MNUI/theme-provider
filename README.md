# React Native Theme Provider

A themeable abstraction over React Native [StyleSheet](https://facebook.github.io/react-native/docs/stylesheet.html).

## Usage

#### Step 1

Install [`react-native-theme-provider`](https://www.npmjs.com/package/react-native-theme-provider) using [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/get-npm).

```
yarn add react-native-theme-provider
```

```
npm install react-native-theme-provider
```

#### Step 2

Wrap your App with a theme provider.

```jsx
import React from "react";
import { ThemeProvider } from "react-native-theme-provider";

const defaultTheme = {
    spacing: (spacing) => 8 * spacing,
}


const themes = {
  light: {
    ...defaultTheme,
    name: "light"
    // some light theme properties
    palette: {
        default: 'rgba(100, 100, 100, .5)',
        primary: '#40A3D0',
        secondary: '#F5FF62',
    }
  },
  dark: {
    ...defaultTheme,
    name: "dark"
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
      <ThemeProvider id={currentTheme.name} theme={currentTheme}>
        <App changeTheme={this.changeTheme} />
      </ThemeProvider>
    );
  }
}
```
#### Step 3

```jsx
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import StyleSheet, { withStyles } from 'react-native-theme-provider'

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
### with type script

```tsx harmony
import React, { Component } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import StyleSheet, { withStyles } from 'react-native-theme-provider'

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

#### customiz

Use it in your components.

```jsx
import Theme, { StylesConsumer, withStyles } from "react-native-theme-provider";

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
| fork from react-native-paint  | ✅ | ❓ |  
| provide theme as props  |   |   |   
| reWrite with type script |   |   |   