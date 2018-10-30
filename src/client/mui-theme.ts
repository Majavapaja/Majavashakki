import { createMuiTheme, Theme } from "@material-ui/core/styles";

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#B8733E",
      contrastText: "#FFF",
    }
  }
});

export default createMuiTheme(theme);
