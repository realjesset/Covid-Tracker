import React from 'react';
import { Typography } from '@material-ui/core';
interface Props {
  date: string | Date | number;
  styles?: Boolean;
}
const RenderDate: React.FC<Props> = ({ date, styles = true }) => {
  return styles ? (
    <Typography variant="body2" color="textSecondary" style={{ display: 'inline-block' }}>
      {date}
    </Typography>
  ) : (
    <React.Fragment>{date}</React.Fragment>
  );
};

export default RenderDate;
