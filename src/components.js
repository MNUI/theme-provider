import React from "react";

const ThemeContext = React.createContext();
const { Provider, Consumer } = ThemeContext

export class ThemeProvider extends React.Component {
  static defaultProps = {
    id: undefined,
    theme: undefined,
    context: undefined
  };

  render() {
    const { id, theme, context, children } = this.props;
    return (
      <Provider
        value={{
          id,
          theme: theme || context || {}
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const StylesConsumer = ({ style, children }) => (
  <Consumer>{({ id, theme }) => children(style.getStyles(id, theme))}</Consumer>
);

export const withStyles = style => WrappedComponent => props => (
  <StylesConsumer style={style}>
    {styles => <WrappedComponent {...props} styles={styles} />}
  </StylesConsumer>
);

export const withTheme = WrappedComponent => props => (
    <Consumer>{({ id, theme }) => <WrappedComponent {...props} theme={theme} />}</Consumer>
);

export const useTheme = () => {
  const { id, theme } = React.useContext(ThemeContext)
  return theme
}

export const useStyle = (style) => {
  const { id, theme } = React.useContext(ThemeContext)
  return style.getStyles(id, theme)
}