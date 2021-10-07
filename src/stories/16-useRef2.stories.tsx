import React, { useCallback, useEffect, useRef, useState } from "react";
import { Story } from "@storybook/react";

export default {
  title: "RefObject & RefCallback",
};

export const RefCallback: Story = () => {
  const [renderBlue, setRenderBlue] = useState(true);
  const [ref, dimensions] = useResizeObserverRefCallback<HTMLDivElement>();
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 500 }}>
      <div>
        <button onClick={() => setRenderBlue(!renderBlue)}>
          {renderBlue ? "Render red" : "Render blue"}
        </button>
        Ref div dimensions: height: {dimensions.height} width:{" "}
        {dimensions.width}
      </div>
      {renderBlue ? (
        <BlueDiv instanceRef={ref} height={100} width={100} />
      ) : (
        <RedDiv instanceRef={ref} height={200} width={200} />
      )}
    </div>
  );
};
RefCallback.storyName = "RefCallback";

type Dimensions = {
  height: number;
  width: number;
};
type ReturnType<ElementType> = [React.RefCallback<ElementType>, Dimensions];
const useResizeObserverRefCallback = <
  ElementType extends Element
>(): ReturnType<ElementType> => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const ref = React.useRef<ElementType | null>(null);

  const observe = useCallback(() => {
    const { current } = ref;
    if (current) {
      observerRef.current = new ResizeObserver(([element]) => {
        // https://alligator.io/js/resize-observer/
        // Unlike with an element’s getBoundingClientRect, contentRect’s values for width and height don’t
        // include padding values. contentRect.top is the element’s top padding
        // and contentRect.left is the element’s left padding.
        const width = element.contentRect.left + element.contentRect.right;
        const height = element.contentRect.top + element.contentRect.bottom;

        setDimensions({ height, width });
      });

      observerRef.current?.observe(current);
    }
  }, []);

  const unobserve = useCallback(() => {
    observerRef.current?.disconnect();
  }, []);

  const initObserver = useCallback(() => {
    unobserve();
    observe();
  }, [observe, unobserve]);

  React.useEffect(() => {
    return () => {
      unobserve();
    };
  }, [unobserve]);

  const refCallback: React.RefCallback<ElementType> = useCallback(
    (instance) => {
      // Callback gives us more fine grained control. We actually get notified when the ref changes.
      // With this ability we can re-write the resizeobserver hook so that it can react to it
      ref.current = instance;
      initObserver();
    },
    [initObserver]
  );

  return [refCallback, dimensions];
};

type DivProps = {
  instanceRef: React.Ref<HTMLDivElement>;
  height: number;
  width: number;
};
function BlueDiv(props: DivProps) {
  const { height, width, instanceRef } = props;
  return (
    <div
      ref={instanceRef}
      style={{ backgroundColor: "lightblue", height, width }}
    />
  );
}

function RedDiv(props: DivProps) {
  const { height, width, instanceRef } = props;
  return (
    <div
      ref={instanceRef}
      style={{ backgroundColor: "lightpink", height, width }}
    />
  );
}
