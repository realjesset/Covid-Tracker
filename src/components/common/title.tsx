import React from 'react';

import { Typography } from '@material-ui/core';

interface Props {
  title: string;
  styles?: Boolean;
}

const RenderTitle: React.FC<Props> = ({ title, styles = true }) => {
  return styles ? (
    <Typography variant="h4" color="textPrimary" style={{ display: 'inline-block' }}>
      {title}
    </Typography>
  ) : (
    <React.Fragment>{title}</React.Fragment>
  );
};

export default RenderTitle;
