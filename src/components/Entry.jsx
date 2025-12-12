import { useEffect } from "react";

export default function Entry({ entry, active, setActivePanel, value }) {
  const setTextWidth = () => {
    const accordion = document.querySelector(".accordion");
    const allText = accordion.querySelectorAll(".text");
    const openEntry = accordion.querySelector("li.active");
    const text = openEntry.querySelector(".text");
    const textWidth = window.getComputedStyle(text).width;

    allText.forEach((text) => {
      text.style.width = textWidth;
    });
  };

  useEffect(() => {
    setTextWidth();
    window.addEventListener("resize", setTextWidth);

    return () => {
      window.removeEventListener("resize", setTextWidth);
    };
  }, []);

  return (
    <li
      onClick={() => setActivePanel(value)}
      className={`entry-li ${active ? "active" : "inactive"}`}
    >
      <article className="entry">
        <div className="background-image">
          <img src={entry.image} alt="Scenic location" />
        </div>
        <div className={`text ${active ? "active" : "inactive"}`}>
          <h2>{entry.title}</h2>
          <p>{entry.body}</p>
        </div>
      </article>
    </li>
  );
}
