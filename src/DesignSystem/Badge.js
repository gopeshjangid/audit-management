import React from 'react';
import Badge from '@atlaskit/badge';

const BadgeComponent = (props) => {
  return <Badge type={props?.type}>{props.children}</Badge>;
};

export default BadgeComponent;