import React from "react";

import { searchWithPostsContextCreator } from "../hooks/hookCreator";
import { HighlightedText } from "../../../components/Search/HighlightedText";

type PropsWithSearch = {
  text: string;
};
export const HighlightedTextWithSearch: React.FC<PropsWithSearch> = (props) => {
  const { useSearchContext } = searchWithPostsContextCreator;
  const { search } = useSearchContext();

  return <HighlightedText search={[search]} text={props.text} />;
};
