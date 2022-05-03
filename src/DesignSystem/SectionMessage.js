import React from 'react';

import SectionMessage from '@atlaskit/section-message';

export default (props) => (
  <SectionMessage
    title={props?.title || ''}
  >
    <p>
      {props.message}
    </p>
  </SectionMessage>
);