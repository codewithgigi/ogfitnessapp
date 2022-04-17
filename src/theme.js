import { createTheme } from "@mui/material/styles";
export const palette = {
  green: "#26A456",
  yellow: "#F9CA25",
  blue: "#2D97E8",
  red: "#F14447",
  purple: "#4D246E",
  brightgreen: "#ACD94A",
};

const theme = createTheme({
  body: {
    backroundColor: "white",
    fontSize: "1rem",
    color: "#2A2A2B",
  },
  palette: {
    primary: {
      light: palette.brightgreen,
      main: palette.brightgreen,
      dark: palette.purple,
      contrastText: "#fff",
    },
    secondary: {
      light: palette.brightgreen,
      main: palette.brightgreen,
      dark: palette.brightgreen,
      contrastText: "#000",
    },
    // secondary: {
    //   light: "",
    //   main: "lightgrey",
    //   dark: "lightgrey",
    //   contrastText: "#fff",
    // },
    error: {
      light: "#c70000",
      main: "#ff6347",
      dark: "#d0533c",
      contrastText: "#1e2022",
    },
    default: {
      light: "#c70000",
      main: "#ff6347",
      dark: "#d0533c",
      contrastText: "#1e2022",
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
    fontSize: 12,
    h1: {
      fontSize: "1.4rem",
      fontWeight: "700",
      textTransform: "capitalize",
      textAlign: "center",
      color: "#1e2022",
      marginBottom: 16,
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h2: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#1e2022",
    },
    h3: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1e2022",
    },
    h4: {
      fontSize: "2.024rem",
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
