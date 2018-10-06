import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#B8733E",
      contrastText: "#FFF",
    },
    text: {
      primary: "#000",
      secondary: "#FFF",
    }
  },
});

export default createMuiTheme(theme);
