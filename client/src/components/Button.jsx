import { Link } from "react-router";
import "../styles/Button.css";

const Button = ({ id, text, to, onClick, type = "submit" }) => {
  if (to) {
    return (
      <button id={id} className="button-primary" type={type}>
        <Link to={to}>{text}</Link>
      </button>
    );
  } else {
    return (
      <button id={id} className="button-primary" type={type} onClick={onClick}>
        {text}
      </button>
    );
  }
};

export default Button;
