import { createTheme } from "@mui/material/styles";
export const palette = {
  green: "#04AA6D",
  orange: "#FF9F19",
  yellow: "#F9CA25",
  blue: "#0071e3",
  contrastBlue: "#0092AB",
  red: "#F14447",
  purple: "#C377E0",
  brightgreen: "#ACD94A",
  white: "#FFFFFF",
  lightestgrey: "#fbfbfd",
  lightgrey: "#F5F5F7",
  black: "#000000",
  magenta: "#ca2266",
  softBlack: "#2A2A2B",
  paleGreen: "#0ad88c",
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
      main: palette.green,
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
    fontFamily: ['"Railway", "Helvetica Neue"', "Arial", "sans-serif"].join(
      ",",
    ),
    h1: {
      fontSize: "2rem",
      fontWeight: "500",
      textTransform: "capitalize",
    },
    h2: {
      fontWeight: "500",
      fontSize: "1.625rem",
      textTransform: "capitalize",
    },
    h3: {
      fontWeight: "500",
      fontSize: "1.375rem",
      textTransform: "capitalize",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: "500",
      color: "#1e2022",
      textTransform: "capitalize",
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: "500",
      textTransform: "capitalize",
    },
    subtitle1: {
      fontSize: "1.125rem",
      color: "#677788",
      textTransform: "capitalize",
    },
  },
});

export default theme;
