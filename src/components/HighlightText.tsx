import styled from "styled-components";

import color from "@constants/color";
import { TextsType } from "@constants/types";

const Span = styled.span`
  color: ${color.primaryBlue};
`;

interface HighlightTextProps {
  texts: TextsType[];
}

const HighlightText = ({ texts }: HighlightTextProps) => (
  <>
    {texts.map((item) =>
      item.type === "highlight" ? (
        <Span key={item.text}>{` ${item.text} `}</Span>
      ) : (
        item.text
      ),
    )}
  </>
);

export default HighlightText;
