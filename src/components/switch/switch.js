import { h } from 'preact';
import style from './style';

const Switch = ({ label = 'switch' }) => {
  return (
    <div class={style.checkbox}>
      <input type="checkbox" id="switch" />
      <label for="switch">{label}</label>
    </div>
  );
};

export default Switch;
