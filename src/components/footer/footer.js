import style from './style';
import { Link } from 'preact-router/match';

const Footer = () => {
  return (
    <footer class={style.footer}>
      <div class={style.madeWith}>
        Made with ❤️by
        <a class={style.link} href="https://twitter.com/dan_eckelt">
          Daniel
        </a>{' '}
        and{' '}
        <a class={style.link} href="https://twitter.com/JCofman">
          Jacob
        </a>
      </div>
      <div>
        <Link href="/imprint" class="imprint">
          Imprint
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
