import React, { useEffect, useState } from "react";
import { Story } from "@storybook/react";

import { useRaf } from "../hooks/useRaf";

export default {
  title: "useRequestAnimationFrame",
};

const BOX_WIDTH = 50;
const MovingBox = () => {
  const [move, setMove] = useState({ direction: "inc", x: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setMove((prevMove) => {
        if (prevMove.direction === "inc" && prevMove.x < BOX_WIDTH) {
          return { ...prevMove, x: prevMove.x + 1 };
        } else if (prevMove.direction === "inc" && prevMove.x === BOX_WIDTH) {
          return { direction: "dec", x: prevMove.x - 1 };
        } else if (prevMove.direction === "dec" && prevMove.x === 0) {
          return { direction: "inc", x: prevMove.x + 1 };
        } else if (prevMove.direction === "dec" && prevMove.x < BOX_WIDTH) {
          return { ...prevMove, x: prevMove.x - 1 };
        } else {
          return prevMove;
        }
      });
    }, 10);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div
      style={{
        background: "lightblue",
        border: "1px solid black",
        height: 100,
        width: 100,
      }}
    >
      <div
        style={{
          position: "relative",
          userSelect: "none",
          height: 50,
          width: BOX_WIDTH,
          background: "white",
          border: "1px solid black",
          top: 25,
          left: move.x,
        }}
      ></div>
    </div>
  );
};

const MovingBoxRaf = () => {
  const [move, setMove] = useState({ direction: "inc", x: 0 });
  useRaf((time) => {
    setMove((prevMove) => {
      if (prevMove.direction === "inc" && prevMove.x < BOX_WIDTH) {
        return { ...prevMove, x: prevMove.x + 1 };
      } else if (prevMove.direction === "inc" && prevMove.x === BOX_WIDTH) {
        return { direction: "dec", x: prevMove.x - 1 };
      } else if (prevMove.direction === "dec" && prevMove.x === 0) {
        return { direction: "inc", x: prevMove.x + 1 };
      } else if (prevMove.direction === "dec" && prevMove.x < BOX_WIDTH) {
        return { ...prevMove, x: prevMove.x - 1 };
      } else {
        return prevMove;
      }
    });
  });

  return (
    <div
      style={{
        background: "lightblue",
        border: "1px solid black",
        height: 100,
        width: 100,
      }}
    >
      <div
        style={{
          position: "relative",
          userSelect: "none",
          height: 50,
          width: BOX_WIDTH,
          background: "white",
          border: "1px solid black",
          top: 25,
          left: move.x,
        }}
      ></div>
    </div>
  );
};

const MovingBoxRow = ({ movingBox }: { movingBox: React.ReactNode }) => {
  return (
    <>
      {movingBox}
      {movingBox}
      {movingBox}
      {movingBox}
      {movingBox}
      {movingBox}
      {movingBox}
    </>
  );
};

type TemplateProps = { children: React.ReactNode };
const Template: Story<TemplateProps> = (args) => {
  const [text, setText] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          background: "lightblue",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {args.children}
      </div>
      <input
        type="text"
        value={text}
        onChange={(event) => {
          const text = event.currentTarget.value;
          setText(text);
        }}
      />
    </div>
  );
};

export const WithoutRaf = Template.bind({});
WithoutRaf.args = {
  children: (
    <>
      <MovingBoxRow movingBox={<MovingBox />} />
      <MovingBoxRow movingBox={<MovingBox />} />
      <MovingBoxRow movingBox={<MovingBox />} />
      <MovingBoxRow movingBox={<MovingBox />} />

      <MovingBoxRow movingBox={<MovingBox />} />
      <MovingBoxRow movingBox={<MovingBox />} />
      <MovingBoxRow movingBox={<MovingBox />} />
      <MovingBoxRow movingBox={<MovingBox />} />
    </>
  ),
};

export const WithRaf = Template.bind({});
WithRaf.args = {
  children: (
    <>
      <MovingBoxRow movingBox={<MovingBoxRaf />} />
      <MovingBoxRow movingBox={<MovingBoxRaf />} />
      <MovingBoxRow movingBox={<MovingBoxRaf />} />
      <MovingBoxRow movingBox={<MovingBoxRaf />} />

      <MovingBoxRow movingBox={<MovingBoxRaf />} />
      <MovingBoxRow movingBox={<MovingBoxRaf />} />
      <MovingBoxRow movingBox={<MovingBoxRaf />} />
      <MovingBoxRow movingBox={<MovingBoxRaf />} />
    </>
  ),
};
