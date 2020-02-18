import React from "react";

const { Provider, Consumer } = React.createContext();

class ThemeProvider extends React.Component {
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

const StylesConsumer = ({ style, children }) => (
  <Consumer>{({ id, theme }) => children(style.getStyles(id, theme))}</Consumer>
);

const withStyles = style => WrappedComponent => props => (
  <StylesConsumer style={style}>
    {styles => <WrappedComponent {...props} styles={styles} />}
  </StylesConsumer>
);

export { StylesProvider, StylesConsumer, withStyles };
