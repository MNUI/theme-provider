import React from "react";
import {Text, View, TouchableOpacity,} from "react-native";
import themes from "./themes";
import StyleSheet, {
  ThemeProvider,
  StylesConsumer,
  withStyles,
  useStyle,
  withTheme,
  useTheme
} from "@material-native-ui/theme-provider";

const style = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: theme.textColor,
    padding: 20
  }
}));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: themes.light
    };
    this.changeTheme = this.changeTheme.bind(this)
  }

  changeTheme (nextTheme) {
    if (this.state.currentTheme !== nextTheme) {
      this.setState({
        currentTheme: nextTheme
      });
    }
  };

  render() {
    const {currentTheme} = this.state;
    return (
        <ThemeProvider theme={currentTheme}>
          <StylesConsumer style={style}>
            {styles => (
                <View style={styles.container}>
                  <Text style={styles.text}>
                    <NameByWithTheme/>
                    <NameByUseTheme />
                  </Text>
                </View>
            )}
          </StylesConsumer>
          <Page changeTheme={this.changeTheme}/>
        </ThemeProvider>
    );
  }
}

const Page = (props) => {
  const styles = useStyle(style)
  return (
      <View style={styles.container}>
        <TextButton
            title={"Light"}
            onPress={() => props.changeTheme(themes.light)}
        />
        <TextButton
            title={"Dark"}
            onPress={() => props.changeTheme(themes.dark)}
        />
        <TextButton
            title={"Silly"}
            onPress={() => props.changeTheme(themes.silly)}
        />
      </View>
  )
}

const TextButtonComp = ({title, onPress, styles}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const TextButton = withStyles(style)(TextButtonComp)

const NameByWithTheme = withTheme((props) => (
    <Text>withTheme: theme is {props.theme.name + "\n"}</Text>
))
const NameByUseTheme = (props) => {
  const theme = useTheme()
  return (
      <Text>useTheme: theme is {theme.name + "\n"}</Text>
  )
}


export default App
