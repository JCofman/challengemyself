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
        Made with ❤️ by <a href="https://twitter.com/dan_eckelt">Daniel</a> and{' '}
        <a href="https://twitter.com/JCofman">Jacob</a>
      </div>
    </footer>
  );
};

export default Footer;
