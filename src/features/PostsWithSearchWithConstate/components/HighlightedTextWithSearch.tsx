import React from "react";

import { HighlightedText } from "../../../components/Search/HighlightedText";
import { SearchContext } from "../hooks/hookCreator";

type PropsWithSearch = {
  text: string;
};
export const HighlightedTextWithSearch: React.FC<PropsWithSearch> = (props) => {
  const [, useSearchContext] = SearchContext;
  const { search } = useSearchContext();

  return <HighlightedText search={[search]} text={props.text} />;
};
