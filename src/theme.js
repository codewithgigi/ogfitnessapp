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
      fontSize: "2rem",
      fontWeight: "500",
      textTransform: "capitalize",
      marginBottom: 16,
    },
    h2: {
      fontWeight: "500",
      fontSize: "1.625rem",
      marginBottom: 16,
    },
    h3: {
      fontWeight: "500",
      fontSize: "1.375rem",
      marginBottom: 10,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: "500",
      color: "#1e2022",
      marginBottom: 10,
      textTransform: "capitalize",
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: "500",
    },
    subtitle1: {
      fontSize: "1.25rem",
      color: "#677788",
    },
  },
});

export default theme;
