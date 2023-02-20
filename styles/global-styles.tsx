import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyles as BaseStyles } from 'twin.macro';

/**
 * Set up as part of twin + tailwind + styled-components + next config example
 * https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components-typescript#add-the-global-styles
 */
const CustomStyles = createGlobalStyle({});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
