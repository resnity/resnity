import { Global, css } from '@emotion/react';
import React from 'react';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

const customStyles = css({
  body: {
    backgroundColor: theme`colors.offwhite`,
    ...tw`antialiased`,
  },
});

const GlobalStyles = () => {
  return (
    <>
      <BaseStyles />
      <Global styles={customStyles} />
    </>
  );
};

export { GlobalStyles };
