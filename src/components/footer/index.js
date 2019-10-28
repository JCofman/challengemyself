import { Link } from 'preact-router/match';

import { useAuth } from '../../hooks/useAuth';
import style from './style';

const Footer = () => {
  return (
    <footer class={style.footer}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Made with ❤️by <a href="">Daniel</a> and <a href="">Jacob</a>
      </div>
    </footer>
  );
};

export default Footer;
