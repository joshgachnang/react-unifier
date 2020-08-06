import React from 'react';

import TextButton from './TextButton';
import { BUTTON_SIZE, MARGIN_LEFT, getDefaultStyle } from './util';

const LoginButton = ({ loginLabel, isLight, ...rest }) => (
  <TextButton
    size={BUTTON_SIZE}
    style={{ marginLeft: MARGIN_LEFT }}
    textStyle={getDefaultStyle(isLight)}
    {...rest}
  >
    {loginLabel}
  </TextButton>
);

export default LoginButton;
