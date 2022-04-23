import { createTheme } from "@mui/material/styles";
export const palette = {
  green: "#62BD4E",
  orange: "#FF9F19",
  yellow: "#F9CA25",
  blue: "#01aecc",
  contrastBlue: "#0092AB",
  red: "#F14447",
  purple: "#C377E0",
  brightgreen: "#ACD94A",
  white: "#FFFFFF",
  lightgrey: "#EBECF0",
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
      main: "#FFF",
      contrastText: "#000",
    },
    error: {
      main: "#EEE",
      contrastText: "#2A2A2B",
    },
    default: {
      main: "#EEE",
      contrastText: "#2A2A2B",
    },
    background: {
      default: "whitesmoke",
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
      fontWeight: "700",
      textTransform: "capitalize",
      textAlign: "center",
      color: "#1e2022",
      marginBottom: 10,
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h2: {
      fontSize: "1rem",
      fontWeight: "700",
      color: "#1e2022",
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e2022",
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: "700",
      color: "#1e2022",
    },
    h6: {
      fontSize: "1.125rem",
      color: "#677788",
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#677788",
    },
  },
});

export default theme;
