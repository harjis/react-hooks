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
            Should see console log immediately
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
      console.log("onVisibilityChange", visibilityRatio);
    },
    []
  );
  const [refCallback, rootRef] = useIsVisible(onVisibilityChange, {
    rootMargin: "50px 0px 0px 0px",
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
            Should see console log when 50% is hidden
          </div>
        </div>
      </div>
    </div>
  );
};

UseIsVisibleTopMargin.story = {
  name: "with top margin",
};

export const UseIsVisibleLeftMargin = () => {
  const onVisibilityChange = useCallback(
    (element, visibilityRatio, isIntersectingFromAbove) => {
      console.log("onVisibilityChange", visibilityRatio);
    },
    []
  );
  const greenElementWidth = 100;
  const [refCallback, rootRef] = useIsVisible(onVisibilityChange, {
    rootMargin: `0px 0px 0px -${greenElementWidth - 1}px`,
    threshold: 1,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: 600,
        width: 600,
        overflow: "auto",
      }}
    >
      <div
        ref={rootRef}
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          overflow: "auto",
          backgroundColor: "aliceblue",
        }}
      >
        <div
          style={{
            left: 0,
            flexShrink: 0,
            position: "sticky",
            backgroundColor: "lightgreen",
            width: greenElementWidth,
          }}
        >
          Sticky
        </div>
        <div style={{ display: "flex" }}>
          <div
            ref={refCallback}
            style={{
              backgroundColor: "pink",
              height: 100,
              width: 350,
              lineHeight: "100px",
            }}
          >
            Should see console log when it goes under green
          </div>
          <div
            style={{
              backgroundColor: "deeppink",
              height: 100,
              width: 300,
              lineHeight: "100px",
            }}
          >
            Other long element
          </div>
        </div>
      </div>
    </div>
  );
};

UseIsVisibleLeftMargin.story = {
  name: "with sticky left",
};
