import { css } from "styled-components";
import "./font.css";

export const Theme = {
    fonts: {
        button: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 600;
            font-size: 36px;
        `,
        subTitle: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 600;
            font-size: 20px;
        `,
    },

    colors: {
        gray: "#717171",
        red: "#D72F2F",
        green: "#2BCD3B",
    },
};
