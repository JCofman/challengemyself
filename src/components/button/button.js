import { h } from 'preact';
import style from './style';

const Button = props => {
  const { children, ...rest } = props;
  return (
    <button class={style.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
