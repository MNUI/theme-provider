import { StyleSheet as StyleSheetNative } from "react-native";

const StyleSheet = {
  ...StyleSheetNative,
  create: styleInput => typeof styleInput === 'function' ? new ThemeFactory(styleInput) : StyleSheetNative.create(styleInput)
};

class ThemeFactory {
  constructor(fn) {
    this.fn = fn;
    this.isObject = typeof fn === "object";
  }

  getStyles = (theme) => {
    return StyleSheetNative.create(this.parseStyles(theme));
  };

  parseStyles = context => (this.isObject ? this.fn : this.fn(context));
}

export default StyleSheet;
