import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Edit from '@material-ui/icons/Edit';

const MetadataDisplay = props => (
  <Card
    style={{
      borderLeft: `4px solid ${props.colour}`,
      marginLeft: `${props.inset * 24}px`,
      marginBottom: 16,
      filter: props.blackAndWhiteMode ? 'grayscale(1.0)' : '',
    }}
  >
    <CardContent>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6" component="h3">
            {props.label || 'Untitled section'}
          </Typography>
        </Grid>
        <Grid>
          <IconButton onClick={props.onEditClick} style={{ padding: 5 }}>
            <Edit fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Typography
        variant="subtitle1"
        component="pre"
        style={{
          whiteSpace: 'pre-line',
        }}
      >
        {props.summary || 'Section description'}
      </Typography>
    </CardContent>
  </Card>
);

MetadataDisplay.propTypes = {
  /** Label of the manifest or range */
  label: PropTypes.string.isRequired,
  /** Summary of the manifest or range */
  summary: PropTypes.string.isRequired,
  /** Time (ms) when metadata should be displayed from */
  startTime: PropTypes.number.isRequired,
  /** Time (ms) when metadata should be displayed until */
  endTime: PropTypes.number.isRequired,
  /** On Edit Click handler */
  onEditClick: PropTypes.func,
  /** Black and white mode */
  blackAndWhiteMode: PropTypes.bool,
  /** how deep the element is in the hierarchy */
  inset: PropTypes.number,
};

MetadataDisplay.defaultProps = {
  label: 'Untitled section',
  summary: '',
  blackAndWhiteMode: false,
};

export default MetadataDisplay;
