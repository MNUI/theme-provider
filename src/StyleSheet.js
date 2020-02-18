import { StyleSheet as StyleSheetNative } from "react-native";

const StyleSheet = {
  ...StyleSheetNative,
  create: fn => new ThemeFactory(fn),
  sheet: obj => StyleSheetNative.create(obj)
};

class ThemeFactory {
  id = undefined;
  styles = undefined;

  constructor(fn) {
    this.fn = fn;
    this.isObject = typeof fn === "object";
  }

  getStyles = (id, theme) => {
    if (this.id !== id) {
      this.id = id;
      this.styles = StyleSheetNative.create(this.parseStyles(theme));
    }
    return this.styles;
  };

  parseStyles = context => (this.isObject ? this.fn : this.fn(context));
}

export default StyleSheet;
