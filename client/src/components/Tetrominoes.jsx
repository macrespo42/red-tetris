import "../styles/Tetrominoes.css";
import I from "../tetrominoes/Tetris_I.svg";
import O from "../tetrominoes/Tetris_O.svg";
import L from "../tetrominoes/Tetris_L.svg";
import S from "../tetrominoes/Tetris_S.svg";
import T from "../tetrominoes/Tetris_T.svg";
import Z from "../tetrominoes/Tetris_Z.svg";

const Tetrominoes = () => {
  const T_array = [I, O, L, S, T, Z];
  T_array.sort(() => Math.random() - 0.5);
  return (
    <div className="tetro-background">
      <div className="I">
        <img src={T_array[0]} alt="tetromino_i" />
      </div>
      <div className="O">
        <img src={T_array[1]} alt="tetromino_o" />
      </div>
      <div className="L">
        <img src={T_array[2]} alt="tetromino_l" />
      </div>
      <div className="S">
        <img src={T_array[3]} alt="tetromino_s" />
      </div>
      <div className="T">
        <img src={T_array[4]} alt="tetromino_t" />
      </div>
      <div className="Z">
        <img src={T_array[5]} alt="tetromino_z" />
      </div>
    </div>
  );
};

export default Tetrominoes;
