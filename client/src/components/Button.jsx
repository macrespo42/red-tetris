import { Link } from "react-router";
import "../styles/Button.css";

const Button = ({ id, text, to }) => {
  return (
    
    <button id={id} className="button-primary" type="submit">
      <Link to={to}>{text}</Link>
    </button>
  );
};

export default Button;
