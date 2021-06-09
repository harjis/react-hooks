import React, { useCallback, useState } from "react";
import { useIsVisible } from "../hooks/useIsVisible";

export default {
  title: "useIsVisible",
};

export const UseIsVisible = () => {
  const onVisibilityChange = useCallback(
    (element, visibilityRatio, isIntersectingFromAbove) => {
      console.log(element, visibilityRatio, isIntersectingFromAbove);
    },
    []
  );
  const [refCallback, rootRef] = useIsVisible(onVisibilityChange);

  return (
    <div>
      <div
        ref={rootRef}
        style={{
          display: "flex",
          justifyContent: "center",
          height: 300,
          width: 300,
          overflow: "scroll",
          backgroundColor: "aliceblue",
        }}
      >
        <div style={{ height: 500 }}>
          <div
            ref={refCallback}
            style={{
              backgroundColor: "pink",
              height: 100,
              lineHeight: "100px",
            }}
          >
            Scroll me
          </div>
        </div>
      </div>
    </div>
  );
};

UseIsVisible.story = {
  name: "component",
};

export const UseIsVisibleTopMargin = () => {
  const onVisibilityChange = useCallback(
    (element, visibilityRatio, isIntersectingFromAbove) => {
      console.log(element, visibilityRatio, isIntersectingFromAbove);
    },
    []
  );
  const [refCallback, rootRef] = useIsVisible(onVisibilityChange, {
    rootMargin: "10px 0px 0px 0px",
  });

  return (
    <div>
      <div
        ref={rootRef}
        style={{
          display: "flex",
          justifyContent: "center",
          height: 300,
          width: 300,
          overflow: "scroll",
          backgroundColor: "aliceblue",
        }}
      >
        <div style={{ height: 500 }}>
          <div
            ref={refCallback}
            style={{
              backgroundColor: "pink",
              height: 100,
              lineHeight: "100px",
            }}
          >
            Scroll me
          </div>
        </div>
      </div>
    </div>
  );
};

UseIsVisibleTopMargin.story = {
  name: "with top margin",
};
