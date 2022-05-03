import React from 'react';

import Tooltip from '@atlaskit/tooltip';

export default (props) => (
  <Tooltip content={props?.content || ''}>
  {
      props.children
  }
  </Tooltip>
);