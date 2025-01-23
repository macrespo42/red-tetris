import "../styles/Controls.css";

const Controls = () => {
  return (
    <div className="controls">
      <div className="top">
        <h4>Rotate</h4>
        <div className="key">
          <div className="triangle-up"></div>
        </div>
      </div>
      <div className="middle">
        <h4>Left</h4>
        <div className="key">
          <div className="triangle-left"></div>
        </div>
        <div className="key">
          <div className="triangle-down"></div>
        </div>
        <div className="key">
          <div className="triangle-right"></div>
        </div>
        <h4>Right</h4>
      </div>
      <div className="bottom">
        <h4>Fast fall</h4>
        <div className="space-bar">
          <div className="space-key"></div>
        </div>
        <h4>Instant fall</h4>
      </div>
    </div>
  );
};

export default Controls;
