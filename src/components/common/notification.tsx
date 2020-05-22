import React from 'react';

import { Grid, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

interface Props {
  message: string;
  type?: string;
}

const RenderNotification: React.FC<Props> = ({ children, message, type = 'feature' }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant="overline" color="textSecondary">
              Click to check out new features
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <ul>
                <li>Font changes</li>
                <li>Added dynamic charts</li>
                <li>Flags added to header</li>
                <li>Card footer is dynamic accoring to data</li>
                <li>
                  Added{' '}
                  <a href="https://ko-fi.com/glider" style={{ color: '#7e57c2' }}>
                    support
                  </a>{' '}
                  button on PC
                </li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  );
};

export default RenderNotification;
