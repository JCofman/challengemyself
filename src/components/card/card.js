import { h } from 'preact';
import style from './style';

const Card = (props) => {
  return <div class={style.card}>{props.children}</div>;
};

export default Card;
