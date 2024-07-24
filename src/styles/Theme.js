import { css } from "styled-components";
import "./Font.css";

export const Theme = {
  fonts: {
    button: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 600;
      font-size: 20px;
    `,
    label: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 700;
      font-size: 15px;
    `,
    footerText: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 800;
      font-size: 12px;
    `,
    navLink: css`
      font-family: "FTLAB-HOON";
      font-weight: 500;
      font-size: 35px;
    `,
  },

  colors: {
    black: "#000000",
    white: "#FFFFFF",
    gray: "#717171",
    red: "#D72F2F",
    green: "#2BCD3B",
    lightBlue: "#81D8F3",
    darkBlue: "#357ae8",
    borderGray: "#C2C2C2",
    yellow: "#FFD439",
  },
};
