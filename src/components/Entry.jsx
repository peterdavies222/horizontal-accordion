export default function Entry({ entry, active, setActivePanel, value }) {
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
