import { Link } from "react-router";
import "../styles/Button.css";

const Button = ({ text, to, onClick, type = "submit" }) => {
  if (to) {
    return (
      <button className="button-primary" type={type}>
        <Link to={to}>{text}</Link>
      </button>
    );
  } else {
    return (
      <button className="button-primary" type={type} onClick={onClick}>
        {text}
      </button>
    );
  }
};

export default Button;
