import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { customVHState, isDarkTheme } from "./atoms";
import Router from "./Router";
import { darkTheme, lightTheme } from "./themes";

const GlobalStyle = createGlobalStyle<{ customVH: string }>`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
    color: inherit;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  #root {
    /* Mobile UI */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;

    /* min-height: 100vh;
    min-height: -moz-available;
    min-height: -webkit-fill-available;
    min-height: fill-available; */
    height: calc(${(props) => props.customVH} * 100);

    overflow: hidden;

    display: flex;
    flex-direction: column;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkTheme);
  const [customVH, setCustomVH] = useRecoilState(customVHState);

  // Custom ViewPort
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      setCustomVH(`${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle customVH={customVH} />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
