import React from "react";
import Highlighter from "react-highlight-words";

import styles from "./HighlightedText.module.css";

type Props = {
  search: string[];
  text: string;
};

export const HighlightedText: React.FC<Props> = (props) => (
  <Highlighter
    highlightClassName={styles.highlight}
    searchWords={props.search}
    autoEscape={true}
    textToHighlight={props.text}
  />
);
