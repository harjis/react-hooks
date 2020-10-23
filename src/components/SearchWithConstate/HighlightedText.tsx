import React from "react";
import Highlighter from "react-highlight-words";

import { SearchContext } from "../../hooks/useSearch";

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
  const [, useSearchContext] = SearchContext;
  const { search } = useSearchContext();
  return <HighlightedText search={[search]} text={props.text} />;
};
