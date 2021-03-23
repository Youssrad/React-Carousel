import React from "react";

export default function FunctionalCarousel({ children, delay }) {
  const [current, setCurrent] = React.useState(0);
  const { length } = children;

  React.useEffect(() => {
    const next = (current + 1) % children.length;
    if (delay) {
      const id = setTimeout(() => setCurrent(next), delay);
      return () => clearTimeout(id);
    }
    return;
  }, [children.length, current, delay]);

  const handlePrev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(children) || children.length <= 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.view_port}>
        <Prev onClick={handlePrev} />
        {children.map((v, i) => {
          return (
            <div
              className={i === current ? "slide active" : "slide"}
              key={i}
              // if not active, hide from screen readers for accessibility
              aria-hidden={i !== current}
            >
              {i === current && <Card content={v} />}
            </div>
          );
        })}
        <Next onClick={handleNext} />
      </div>
    </div>
  );
}

const Next = ({ onClick }) => (
  <div style={styles.button} onClick={onClick}>
    <p style={styles.button_txt}>Next</p>
  </div>
);
const Prev = ({ onClick }) => (
  <div style={styles.button} onClick={onClick}>
    <p style={styles.button_txt}>Prev</p>
  </div>
);

const Card = ({ content }) => (
  <div style={styles.card}>
    <h1 style={styles.card_content}>{content}</h1>
  </div>
);

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  view_port: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  // Carousel Card
  card: {
    height: 200,
    width: 200,
    backgroundColor: "#596af0",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },
  card_content: {
    color: "white",
    textAlign: "center",
    margin: 0,
  },

  // Carousel control buttons
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 70,
    backgroundColor: "#ed8761",
    borderRadius: 15,
    margin: 50,
  },
  button_txt: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
};
