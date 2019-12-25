import { h } from 'preact';

import Heading from '../../components/heading';
import style from './imprint.css';

const Imprint = () => {
  return (
    <section class={style.imprint_section}>
      <Heading appearance="H3" class={style.imprint_heading}>
        Imprint
      </Heading>
      <p class={style.imprint_text}>
        ChallengeMySelf
        <br />
        76131 Karlsruhe
        <br /> <br />
        Email: crymis[at]web.de <br />
        URL: challengemyself.now.sh <br /> <br />
        Jacob Cofman and Daniel Eckelt
      </p>
    </section>
  );
};

export default Imprint;
