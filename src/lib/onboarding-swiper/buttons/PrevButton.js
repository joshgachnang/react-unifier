import React from 'react';

import TextButton from './TextButton';
import { BUTTON_SIZE, MARGIN_RIGHT, getDefaultStyle } from './util';

const PrevButton = ({ prevLabel, isLight, ...rest }) => (
  <TextButton
    size={BUTTON_SIZE}
    style={{ marginRight: MARGIN_RIGHT }}
    textStyle={getDefaultStyle(isLight)}
    {...rest}
  >
    {prevLabel}
  </TextButton>
);

export default PrevButton;
