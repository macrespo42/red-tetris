import { Link } from "react-router";
const Button = ({ text, to }) => {
  return (
    <button className="button-primary" type="submit">
      <Link to={to}>{text}</Link>
    </button>
  );
};

export default Button;
