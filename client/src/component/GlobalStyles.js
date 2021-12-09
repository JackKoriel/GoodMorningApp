import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

*,
html, body, div,
  input, button, select, option,
  h1, h2, h3, h4, h5, h6, p, NavLink,
  text {
    /* font-family: sans-serif, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
    font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif; 
  }

  html, body {
    max-width: 100vw;
  }
button {
  cursor: pointer;
}
  :root {
--morning-color: #50b7f5;
--morning-background: #e6ecf0;
--primary: hsl(258deg, 100%, 50%);
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }


`;
