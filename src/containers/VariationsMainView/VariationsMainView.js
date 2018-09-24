import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import VariationsAppBar from '../../components/VariationsAppBar/VariationsAppBar';
import AudioTransportBar from '../../components/AudioTransportBar/AudioTransportBar';
import ProjectMetadata from '../../components/Metadata/Metadata';
import AudioImporter from '../../components/AudioImporter/AudioImporter';
import SettingsPopup from '../../components/SettingsPopoup/SettingsPopup';

import BubbleEditor from '../BubbleEditor/BubbleEditor';
import { Grid, Typography } from '@material-ui/core';

import { updateSettings } from '../../actions/project';
import {
  showImportModal,
  showSettingsModal,
  setVolume,
  play,
  pause,
  dismissImportModal,
  dismissSettingsModal,
} from '../../actions/viewState';

class VariationsMainView extends React.Component {
  constructor(props) {
    super(props);
    this.theme = createMuiTheme({
      palette: {
        primary: {
          light: '#757ce8',
          main: '#3f50b5',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#d2abf3',
          main: '#C797F0',
          dark: '#8b69a8',
          contrastText: '#000',
        },
      },
      status: {
        danger: 'orange',
      },
    });
    this.state = {
      dimensions: {
        width: -1,
        height: -1,
      },
    };
  }
  render() {
    const _points = this.props.points;
    const {
      isPlaying,
      volume,
      onVolumeChanged,
      currentTime,
      runTime,
      manifestLabel,
      manifestSummary,
      isImportOpen,
      isSettingsOpen,
    } = this.props;
    const timePoints = Array.from(
      Object.values(this.props.points).reduce((_timePoints, bubble) => {
        _timePoints.add(bubble.startTime);
        _timePoints.add(bubble.endTime);
        return _timePoints;
      }, new Set())
    );
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MuiThemeProvider theme={this.theme}>
          <VariationsAppBar
            title={manifestLabel}
            onImportButtonClicked={this.props.showImportModal}
            onEraseButtonClicked={() => {}}
            onSaveButtonClicked={() => {}}
            onSettingsButtonClicked={this.props.showSettingsModal}
            onTitleChange={() => {}}
          />
          <BubbleEditor />
          <AudioTransportBar
            isPlaying={isPlaying}
            volume={volume}
            onVolumeChanged={this.props.setVolume}
            currentTime={currentTime}
            runTime={runTime}
            onPlay={this.props.play}
            onPause={this.props.pause}
            onNextBubble={() => {}}
            onPreviousBubble={() => {}}
            onScrubAhead={() => {}}
            onScrubBackwards={() => {}}
          />
          <div
            style={{
              padding: 16,
              background: '#EEEEEE',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ProjectMetadata
              ranges={_points}
              currentTime={currentTime}
              runtime={runTime}
              manifestLabel={manifestLabel}
              manifestSummary={manifestSummary}
            />
            <Grid
              container
              style={{
                marginTop: 24,
                height: 24,
              }}
            >
              <Grid item xs={6}>
                <Typography variant="body1">
                  &copy; Indiana University, 2018
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  textAlign: 'right',
                }}
              >
                <Typography variant="body1">
                  About Timeliner | Help | Contact
                </Typography>
              </Grid>
            </Grid>
          </div>
          <AudioImporter
            open={isImportOpen}
            onClose={this.props.dismissImportModal}
            onImport={manifest => {}}
          />
          <SettingsPopup
            open={isSettingsOpen}
            onClose={this.props.dismissSettingsModal}
            onSave={this.props.updateSettings}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

VariationsMainView.propTypes = {
  updateSettings: PropTypes.func,
  showImportModal: PropTypes.func,
  showSettingsModal: PropTypes.func,
  setVolume: PropTypes.func.isRequired,
  play: PropTypes.func,
  pause: PropTypes.func,
  dismissImportModal: PropTypes.func,
  dismissSettingsModal: PropTypes.func,
  volume: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  runTime: PropTypes.number.isRequired,
  manifestLabel: PropTypes.string.isRequired,
  manifestSummary: PropTypes.string.isRequired,
  points: PropTypes.array,
  isImportOpen: PropTypes.bool.isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
};

const mapStateProps = state => ({
  volume: state.viewState.volume,
  isPlaying: state.viewState.isPlaying,
  currentTime: state.canvas.currentTime,
  runTime: state.canvas.duration,
  manifestLabel: state.project.title,
  manifestSummary: state.project.description,
  points: Object.values(state.range),
  isImportOpen: state.viewState.isImportOpen,
  isSettingsOpen: state.viewState.isSettingsOpen,
});

const mapDispatchToProps = {
  //project actions
  updateSettings,
  //view state actions
  showImportModal,
  showSettingsModal,
  setVolume,
  play,
  pause,
  dismissImportModal,
  dismissSettingsModal,
};

export default connect(
  mapStateProps,
  mapDispatchToProps
)(VariationsMainView);