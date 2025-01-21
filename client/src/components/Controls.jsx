import "../styles/Controls.css";

const Controls = () => {
  return (
    <div className="controls">
      <div className="top">
        <h3>Rotate</h3>
        <div className="key">
          <div className="triangle-up"></div>
        </div>
      </div>
      <div className="middle">
        <h3>Left</h3>
        <div className="key">
          <div className="triangle-left"></div>
        </div>
        <div className="key">
          <div className="triangle-down"></div>
        </div>
        <div className="key">
          <div className="triangle-right"></div>
        </div>
        <h3>Right</h3>
      </div>
      <div className="bottom">
        <h3>Fast fall</h3>
        <div className="space-bar">
          <div className="space-key"></div>
        </div>
        <h3>Instant fall</h3>
      </div>
    </div>
  );
};

export default Controls;
