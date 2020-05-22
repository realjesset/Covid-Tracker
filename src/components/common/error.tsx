import React from "react";

import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface Props {
  errors: string[];
}

const RenderErrorBox: React.FC<Props> = ({ errors }) => {
  return (
    <Alert
      variant="outlined"
      severity="error"
      style={{
        maxHeight: "100vh",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">Error!</Typography>
      <ul>
        {errors.map((error, i) => (
          <li key={i}>
            <Typography variant="body1">{error}</Typography>
          </li>
        ))}
        <li>
          <Typography variant="body1">Please restart to try again</Typography>
        </li>
      </ul>
    </Alert>
  );
};

export default RenderErrorBox;
