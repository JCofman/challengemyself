import PropTypes from 'prop-types';
import style from './style';

export const APPEARANCES = {
  H1: `H1`,
  H2: `H2`,
  H3: `H3`,
  H4: `H4`,
  H5: `H5`,
  H6: `H6`,
};

const Heading = ({ appearance, children, ...rest }) => {
  const { ...headingProps } = rest;
  switch (appearance) {
    case `H1`:
      return (
        <h1 {...headingProps} class={style.h1}>
          {children}
        </h1>
      );
    case `H2`:
      return (
        <h2 {...headingProps} class={style.h2}>
          {children}
        </h2>
      );
    case `H3`:
      return (
        <h3 {...headingProps} class={style.h3}>
          {children}
        </h3>
      );
    case `H4`:
      return (
        <h4 {...headingProps} class={style.h4}>
          {children}
        </h4>
      );
    case `H5`:
      return (
        <h5 {...headingProps} class={style.h5}>
          {children}
        </h5>
      );
    case `H6`:
      return (
        <h6 {...headingProps} class={style.h6}>
          {children}
        </h6>
      );
    default:
      return null;
  }
};

Heading.displayName = `Heading`;

Heading.propTypes = {
  /** any nodes to be rendered (usually text nodes) */
  children: PropTypes.any,

  /** typography of the heading */
  appearance: PropTypes.oneOf(Object.keys(APPEARANCES)),
};

Heading.defaultProps = {
  appearance: APPEARANCES.H1,
};

export default Heading;
