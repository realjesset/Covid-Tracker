import React from 'react';

import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { SyncLoader } from 'react-spinners';

interface Props {
  color?: string;
  size?: number;
  styles?: string;
}

const RenderLoading: React.FC<Props> = ({ children, color, size = 15, styles }) => {
  const theme: Theme = useTheme();
  return (
    <SyncLoader
      color={theme.palette.primary.main}
      size={size}
      css={'text-align: center; padding-top: 25vh; vertical-align: middle'}
    ></SyncLoader>
  );
};

export default RenderLoading;
