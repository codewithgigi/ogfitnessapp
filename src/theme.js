import { createTheme } from "@mui/material/styles";
export const palette = {
  green: "#62BD4E",
  orange: "#FF9F19",
  yellow: "#F9CA25",
  blue: "#3e6ae1",
  contrastBlue: "#0092AB",
  red: "#F14447",
  purple: "#C377E0",
  brightgreen: "#ACD94A",
  white: "#FFFFFF",
  lightgrey: "#EBECF0",
  black: "#000000",
};
export const layout = {
  //contentWidth: 1236,
  contentWidth: 1000,
};

const theme = createTheme({
  body: {
    backroundColor: "white",
    fontSize: 16,
    color: "#2A2A2B",
    fontFamily: ['"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: palette.blue,
      contrastText: "#fff",
    },
    secondary: {
      main: "#000",
      contrastText: "#FFF",
    },
    error: {
      main: "#d32f2f",
      contrastText: "#FFF",
    },
    default: {
      main: "#EEE",
      contrastText: "#2A2A2B",
    },
    background: {
      default: "white",
    },
  },
  layout: {
    //contentWidth: 1236,
    contentWidth: 1000,
  },
  typography: {
    fontSize: 16,
    fontFamily: ['"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "1.2rem",
      fontWeight: "600",
      textTransform: "capitalize",
      color: "#1e2022",
      marginBottom: 10,
    },
    h2: {
      fontSize: "1rem",
      color: "#1e2022",
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e2022",
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e2022",
    },
    h6: {
      fontSize: "1.125rem",
      color: "#677788",
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#677788",
    },
  },
});

export default theme;
