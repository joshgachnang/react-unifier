import * as React from "react";
import PropTypes from "prop-types";
import VideoControls from "./VideoControls";
const styles = require("./Video.module.css");
import Box from "./Box";

type Source = string | {type: "video/m3u8" | "video/mp4" | "video/ogg"; src: string}[];

interface Props {
  accessibilityMaximizeLabel: string;
  accessibilityMinimizeLabel: string;
  accessibilityMuteLabel: string;
  accessibilityPauseLabel: string;
  accessibilityPlayLabel: string;
  accessibilityUnmuteLabel: string;
  aspectRatio: number;
  captions: string;
  children?: React.ReactNode;
  controls?: boolean;
  loop?: boolean;
  onDurationChange?: (arg0: {
    event: React.SyntheticEvent<HTMLVideoElement>;
    duration: number;
  }) => void;
  onEnded?: (arg0: {event: React.SyntheticEvent<HTMLVideoElement>}) => void;
  onFullscreenChange?: (arg0: {event: Event; fullscreen: boolean}) => void;
  onLoadedChange?: (arg0: {event: React.SyntheticEvent<HTMLVideoElement>; loaded: number}) => void;
  onPlay?: (arg0: {event: React.SyntheticEvent<HTMLDivElement>}) => void;
  onPlayheadDown?: (arg0: {event: React.MouseEvent<HTMLDivElement>}) => void;
  onPlayheadUp?: (arg0: {event: React.MouseEvent<HTMLDivElement>}) => void;
  onPause?: (arg0: {event: React.SyntheticEvent<HTMLDivElement>}) => void;
  onReady?: (arg0: {event: React.SyntheticEvent<HTMLVideoElement>}) => void;
  onSeek?: (arg0: {event: React.SyntheticEvent<HTMLVideoElement>}) => void;
  onTimeChange?: (arg0: {event: React.SyntheticEvent<HTMLVideoElement>; time: number}) => void;
  onVolumeChange?: (arg0: {event: React.SyntheticEvent<HTMLDivElement>; volume: number}) => void;
  playbackRate: number;
  playing: boolean;
  playsInline?: boolean;
  poster?: string;
  preload: "auto" | "metadata" | "none";
  src: Source;
  volume: number;
}

interface State {
  currentTime: number;
  duration: number;
  fullscreen: boolean;
}

// For more information on fullscreen and vendor prefixes see
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

const requestFullscreen = (element: HTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if ((element as any).webkitRequestFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    (element as any).webkitRequestFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if ((element as any).mozRequestFullScreen) {
    // $FlowIssue - vendor prefix missing from Flow
    (element as any).mozRequestFullScreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if ((element as any).msRequestFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    (element as any).msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if ((document as any).webkitExitFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    (document as any).webkitExitFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if ((document as any).mozCancelFullScreen) {
    // $FlowIssue - vendor prefix missing from Flow
    (document as any).mozCancelFullScreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if ((document as any).msExitFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    (document as any).msExitFullscreen();
  }
};

// Normally document.fullscreen suffices here as a flag, but IE11 does not
// have a vendor specific version so we must instead use the actual element
const isFullscreen = () =>
  document.fullscreenElement || // $FlowIssue - vendor prefix missing from Flow
  (document as any).webkitFullscreenElement || // $FlowIssue - vendor prefix missing from Flow
  (document as any).mozFullScreenElement || // $FlowIssue - vendor prefix missing from Flow
  (document as any).msFullscreenElement;

const addFullscreenEventListener = (listener: EventListener) => {
  document.addEventListener("fullscreenchange", listener);
  document.addEventListener("webkitfullscreenchange", listener);
  document.addEventListener("mozfullscreenchange", listener);
  document.addEventListener("MSFullscreenChange", listener);
};

const removeFullscreenEventListener = (listener: EventListener) => {
  document.removeEventListener("fullscreenchange", listener);
  document.removeEventListener("webkitfullscreenchange", listener);
  document.removeEventListener("mozfullscreenchange", listener);
  document.removeEventListener("MSFullscreenChange", listener);
};

const isNewSource = (oldSource: Source, newSource: Source): boolean => {
  if (typeof oldSource !== typeof newSource) {
    // If the source type changed from string to Array
    // or vice versa, we have a new source
    return true;
  }
  if (Array.isArray(newSource)) {
    if (oldSource.length !== newSource.length) {
      // If the sources are both an Array, and the lengths
      // do not match we evaluate as a new source
      return true;
    }
    // If the sources are both an Array and the same length,
    // verify every element stayed the same
    return newSource.some(
      (source, index) =>
        !Array.isArray(oldSource) ||
        source.type !== oldSource[index].type ||
        source.src !== oldSource[index].src
    );
  }
  // If the sources are both a string, simply compare
  // the new with the old
  return newSource !== oldSource;
};

export default class Video extends React.PureComponent<Props, State> {
  video: HTMLVideoElement | null | undefined;

  player: HTMLDivElement | null | undefined;

  static propTypes = {
    accessibilityMaximizeLabel: PropTypes.string,
    accessibilityMinimizeLabel: PropTypes.string,
    accessibilityMuteLabel: PropTypes.string,
    accessibilityPauseLabel: PropTypes.string,
    accessibilityPlayLabel: PropTypes.string,
    accessibilityUnmuteLabel: PropTypes.string,
    aspectRatio: PropTypes.number.isRequired,
    captions: PropTypes.string.isRequired,
    children: PropTypes.node,
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    onDurationChange: PropTypes.func,
    onEnded: PropTypes.func,
    onFullscreenChange: PropTypes.func,
    onLoadedChange: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onReady: PropTypes.func,
    onSeek: PropTypes.func,
    onTimeChange: PropTypes.func,
    onVolumeChange: PropTypes.func,
    playbackRate: PropTypes.number,
    playing: PropTypes.bool,
    playsInline: PropTypes.bool,
    poster: PropTypes.string,
    preload: PropTypes.oneOf(["auto", "metadata", "none"]),
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(["video/m3u8", "video/mp4", "video/ogg"]).isRequired,
          src: PropTypes.string.isRequired,
        })
      ),
    ]).isRequired,
    volume: PropTypes.number,
  };

  static defaultProps = {
    playbackRate: 1,
    playing: false,
    preload: "auto",
    volume: 1,
  };

  state = {
    currentTime: 0,
    duration: 0,
    fullscreen: false,
  };

  /**
   * React lifecycle hooks pertinent to Video
   */
  componentDidMount() {
    const {playbackRate, playing, volume} = this.props;
    // Set up event listeners to catch backdoors in fullscreen
    // changes such as using the ESC key to exit
    if (typeof document !== "undefined") {
      addFullscreenEventListener(this.handleFullscreenChange);
    }
    // Load the video to hydrate the DOM after a server render
    this.load();
    // Set the initial volume
    this.setVolume(volume);
    // Set the initial playback rate
    this.setPlaybackRate(playbackRate);
    // Simulate an autoplay effect if the component
    if (playing) {
      this.play();
    }
  }

  componentDidUpdate(prevProps: Props) {
    // If the video source changed, reload the video
    if (isNewSource(prevProps.src, this.props.src)) {
      this.load();
    }
    // If the volume changed, set the new volume
    if (prevProps.volume !== this.props.volume) {
      this.setVolume(this.props.volume);
    }
    // If the playback rate changed, set the new rate
    if (prevProps.playbackRate !== this.props.playbackRate) {
      this.setPlaybackRate(this.props.playbackRate);
    }
    // If the playback changed, play or pause the video
    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  componentWillUnmount() {
    removeFullscreenEventListener(this.handleFullscreenChange);
  }

  /**
   * DOM reference housekeeping that is needed for functionality
   */

  // The player element encapsulates the actual video DOM
  // element as well as the controls to bring both fullscreen
  setPlayerRef = (ref: HTMLDivElement | null | undefined) => {
    this.player = ref;
  };

  // The actual reference to the video HTML DOM element
  setVideoRef = (ref: HTMLVideoElement | null | undefined) => {
    this.video = ref;
  };

  /**
   * Functions that directly interact with the HTML video element
   */
  // Set the video to the desired playback rate: 1 (normal)
  setPlaybackRate = (playbackRate: number) => {
    if (this.video) {
      this.video.playbackRate = playbackRate;
    }
  };

  // Set the video to the desired volume: 0 (muted) -> 1 (max)
  setVolume = (volume: number) => {
    if (this.video) {
      this.video.volume = volume;
    }
  };

  // Change the video source and re-load the video
  load = () => {
    if (this.video) {
      this.video.load();
    }
  };

  // Pause the video
  pause = () => {
    if (this.video) {
      this.video.pause();
    }
  };

  // Play the video
  play = () => {
    if (this.video) {
      this.video.play();
    }
  };

  // Seek the video to the desired time
  seek = (time: number) => {
    if (this.video) {
      this.video.currentTime = time;
    }
  };

  // Enter/exit fullscreen video player mode
  toggleFullscreen = () => {
    if (isFullscreen()) {
      exitFullscreen();
    } else if (this.player) {
      requestFullscreen(this.player);
    }
  };

  /**
   * Handlers for various media events on the video
   */
  // Sent when enough data is available that the media can be played
  handleCanPlay = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const {onReady} = this.props;

    if (onReady) {
      onReady({event});
    }
  };

  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  handleDurationChange = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const {onDurationChange} = this.props;
    const duration = (this.video && this.video.duration) || 0;
    this.setState({duration});

    if (onDurationChange) {
      onDurationChange({event, duration});
    }
  };

  // Sent when playback completes.
  handleEnded = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const {onEnded} = this.props;

    if (onEnded) {
      onEnded({event});
    }
  };

  // Sent when the video is switched to/out-of fullscreen mode
  handleFullscreenChange = (event: Event) => {
    const {onFullscreenChange} = this.props;
    const fullscreen = !!isFullscreen();
    this.setState({fullscreen});

    if (onFullscreenChange) {
      onFullscreenChange({event, fullscreen});
    }
  };

  // Sent when playback of the media starts after having been paused.
  handlePlay = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const {onPlay} = this.props;

    if (onPlay) {
      onPlay({event});
    }
  };

  // Sent when mouse down event happens on playhead
  handlePlayheadDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const {onPlayheadDown} = this.props;

    if (onPlayheadDown) {
      onPlayheadDown({event});
    }
  };

  // Sent when mouse up event happens on playhead
  handlePlayheadUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const {onPlayheadUp} = this.props;

    if (onPlayheadUp) {
      onPlayheadUp({event});
    }
  };

  // Sent when playback is paused.
  handlePause = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const {onPause} = this.props;

    if (onPause) {
      onPause({event});
    }
  };

  // Sent periodically to inform interested parties of progress downloading the media
  handleProgress = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const {onLoadedChange} = this.props;
    const {buffered} = this.video || {};
    const loaded = buffered && buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;

    if (onLoadedChange) {
      onLoadedChange({event, loaded});
    }
  };

  // Sent when a seek operation completes.
  handleSeek = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const {onSeek} = this.props;

    if (onSeek) {
      onSeek({event});
    }
  };

  // The time indicated by the element's currentTime attribute has changed
  handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const {onTimeChange} = this.props;
    const currentTime = (this.video && this.video.currentTime) || 0;
    this.setState({currentTime});

    if (onTimeChange) {
      onTimeChange({event, time: currentTime});
    }
  };

  // Sent when the audio volume changes
  handleVolumeChange = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const {onVolumeChange} = this.props;
    const muted = (this.video && this.video.muted) || false;

    if (onVolumeChange) {
      onVolumeChange({event, volume: muted ? 1 : 0});
    }
  };

  render() {
    const {
      aspectRatio,
      captions,
      children,
      loop,
      playing,
      playsInline,
      poster,
      preload,
      src,
      volume,
    } = this.props;
    const {currentTime, duration, fullscreen} = this.state;

    const paddingBottom = (fullscreen && "0") || `${(1 / aspectRatio) * 100}%`;

    return (
      <div
        ref={this.setPlayerRef}
        className={styles.player}
        style={{paddingBottom, height: fullscreen ? "100%" : 0}}
      >
        <video
          autoPlay={playing}
          loop={loop}
          muted={volume === 0}
          playsInline={playsInline}
          poster={poster}
          preload={preload}
          src={typeof src === "string" ? src : undefined}
          ref={this.setVideoRef}
          className={styles.video}
          onCanPlay={this.handleCanPlay}
          onDurationChange={this.handleDurationChange}
          onEnded={this.handleEnded}
          onSeeked={this.handleSeek}
          onTimeUpdate={this.handleTimeUpdate}
          onProgress={this.handleProgress}
        >
          {Array.isArray(src) &&
            src.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
          <track kind="captions" src={captions} />
        </video>
        {children && (
          <Box position="absolute" top left bottom right overflow="hidden">
            {children}
          </Box>
        )}
        {/* Need to use full path for these props so Flow can infer correct subtype */}
        {this.props.controls && (
          <VideoControls
            accessibilityMaximizeLabel={this.props.accessibilityMaximizeLabel}
            accessibilityMinimizeLabel={this.props.accessibilityMinimizeLabel}
            accessibilityMuteLabel={this.props.accessibilityMuteLabel}
            accessibilityPauseLabel={this.props.accessibilityPauseLabel}
            accessibilityPlayLabel={this.props.accessibilityPlayLabel}
            accessibilityUnmuteLabel={this.props.accessibilityUnmuteLabel}
            currentTime={currentTime}
            duration={duration}
            fullscreen={fullscreen}
            onPlay={this.handlePlay}
            onPlayheadDown={this.handlePlayheadDown}
            onPlayheadUp={this.handlePlayheadUp}
            onPause={this.handlePause}
            onFullscreenChange={this.toggleFullscreen}
            onVolumeChange={this.handleVolumeChange}
            playing={playing}
            seek={this.seek}
            volume={volume}
          />
        )}
      </div>
    );
  }
}