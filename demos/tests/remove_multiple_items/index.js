import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import range from "lodash-es/range";

export default function Container() {
  const [items, setItems] = useState(range(10));

  const removeItems = useCallback(() => setItems(range(5)));

  const addItems = useCallback(() => setItems(range(10)));

  const transitions = useTransition(items, null, {
    from: { transform: "translate3d(0,40px,0)", opacity: 0 },
    enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
    leave: { transform: "translate3d(0,40px,0)", opacity: 0 }
  });

  return (
    <div style={{ padding: "1.5rem" }}>
      <button className="fts-btn" onClick={removeItems}>
        Remove
      </button>
      <button className="fts-btn" onClick={addItems}>
        Add
      </button>
      <div style={{ display: 'flex'}}>
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            {item}
          </animated.div>
        ))}
      </div>
    </div>
  );
}
