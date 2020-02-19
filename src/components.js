import React from "react";

const ThemeContext = React.createContext();
const { Provider, Consumer } = ThemeContext

export class ThemeProvider extends React.Component {
  static defaultProps = {
    theme: undefined,
    context: undefined
  };

  render() {
    const { theme, context, children } = this.props;
    return (
      <Provider
        value={{
          theme: theme || context || {}
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const StylesConsumer = ({ style, children }) => (
  <Consumer>{({ theme }) => children(style.getStyles(theme))}</Consumer>
);

export const withStyles = style => WrappedComponent => props => {
  return  typeof style.getStyles === 'function' ? (
      <StylesConsumer style={style}>
        {styles => <WrappedComponent {...props} styles={styles} />}
      </StylesConsumer>
  ): (
      <WrappedComponent {...props} styles={style} />
  );
}

export const withTheme = WrappedComponent => props => (
    <Consumer>{({ theme }) => <WrappedComponent {...props} theme={theme} />}</Consumer>
);

export const useTheme = () => {
  const { theme } = React.useContext(ThemeContext)
  return theme
}

export const useStyle = (style) => {
  const { theme } = React.useContext(ThemeContext)
  return typeof style.getStyles === 'function' ? style.getStyles(theme) : style
}