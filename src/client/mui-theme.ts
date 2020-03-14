import { createMuiTheme, Theme } from "@material-ui/core/styles";

const theme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "#B8733E",
      contrastText: "#FFF",
    },
  },
  overrides: {
    MuiPaper: {
      elevation2: {
        // paper elevation depth is 2 by default and it cannot be changed
        // therefore let's set elevation2 to same as elevation4
        boxShadow: "0px 2px 4px -1px rgba(40, 40, 40, 0.2),0px 4px 5px 0px rgba(40, 40, 40, 0.14),0px 1px 10px 0px rgba(40, 40, 40, 0.12)",
      },
    },
  },
});

export default createMuiTheme(theme);
