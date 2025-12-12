import { useState, useEffect, useRef } from "react";
import entriesData from "../entries";
import Entry from "./Entry";
import { wobble, unwobble } from "../functions/wobble";

export default function Accordion() {
  const [activePanel, setActivePanel] = useState(0);
  const [prevActivePanel, setPrevActivePanel] = useState(0);
  const scroller = useRef();

  const scrollToOpenPanel = () => {
    const scrollerGap = parseInt(window.getComputedStyle(scroller.current).gap);
    const inactivePanel = document.querySelector(
      `.accordion li.inactive:not(:nth-child(${prevActivePanel + 1}))`
    );
    const inactiveWidth = parseInt(
      window.getComputedStyle(inactivePanel).width
    );
    const scrollLeft = activePanel * (scrollerGap + inactiveWidth);
    scroller.current.scrollLeft = scrollLeft;
    console.log(inactiveWidth, scrollLeft);
  };

  useEffect(() => {
    scrollToOpenPanel();
    setPrevActivePanel(activePanel);
  }, [activePanel]);

  const prevPanel = () => {
    setActivePanel((prev) => {
      let newValue = (prev - 1) % entriesData.length;
      if (newValue < 0) {
        newValue += entriesData.length;
      }
      return newValue;
    });
  };

  const nextPanel = () => {
    setActivePanel((prev) => {
      let newValue = (prev + 1) % entriesData.length;
      return newValue;
    });
  };

  const entries = entriesData.map((entry, i) => {
    return (
      <Entry
        key={i}
        value={i}
        entry={entry}
        active={activePanel === i}
        setActivePanel={setActivePanel}
      />
    );
  });

  const indicators = entriesData.map((entry, i) => {
    return (
      <li className="indicator" key={i}>
        <button
          className={`${activePanel === i ? "active" : "inactive"}`}
          onClick={() => {
            setActivePanel(i);
          }}
        >
          <p className="hidden">{i + 1}</p>
        </button>
      </li>
    );
  });

  return (
    <>
      <h1>Accordion</h1>
      <div className="accordion">
        <ul ref={scroller}>{entries}</ul>
      </div>
      <div className="indicators">
        {/* <ul>{indicators}</ul> */}
        <div>
          <button onClick={prevPanel}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
            </svg>
          </button>
          <button onClick={nextPanel}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
