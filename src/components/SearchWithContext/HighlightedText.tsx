import React, { useContext } from "react";
import Highlighter from "react-highlight-words";

import { store } from "../../hooks/useSearchContext";

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

type PropsWithSearch = {
  text: string;
};
export const HighlightedTextWithSearch: React.FC<PropsWithSearch> = (props) => {
  const { search } = useContext(store);

  return <HighlightedText search={[search]} text={props.text} />;
};
