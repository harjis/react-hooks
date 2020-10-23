import React from "react";

import { HighlightedText } from "../../../components/Search/HighlightedText";
import { searchWithPostsConstateCreator } from "../hooks/hookCreator";

type PropsWithSearch = {
  text: string;
};
export const HighlightedTextWithSearch: React.FC<PropsWithSearch> = (props) => {
  const { useSearchContext } = searchWithPostsConstateCreator();
  const { search } = useSearchContext();

  return <HighlightedText search={[search]} text={props.text} />;
};
