import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  ViewPropTypes,
} from 'react-native';
import tinycolor from 'tinycolor2';
import DoneButton from './buttons/DoneButton';
import LoginButton from './buttons/LoginButton';
import NextButton from './buttons/NextButton';
import SkipButton from './buttons/SkipButton';
import PrevButton from './buttons/PrevButton';
import Dot from './Dot';
import Page from './Page';
import Pagination from './Pagination';

// hotfix: https://github.com/facebook/react-native/issues/16710
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };

class Onboarding extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
      previousPage: null,
      width: null,
      height: null,
      backgroundColorAnim: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    Animated.timing(this.state.backgroundColorAnim, {
      toValue: 1,
      duration: this.props.transitionAnimationDuration,
    }).start();
  }

  onSwipePageChange = ({ viewableItems }) => {
    if (!viewableItems[0] || this.state.currentPage === viewableItems[0].index)
      return;

    this.setState(state => {
      return {
        previousPage: state.currentPage,
        currentPage: viewableItems[0].index,
        backgroundColorAnim: new Animated.Value(0),
      };
    });
  };

  goNext = () => {
    this.flatList.scrollToIndex({
      animated: true,
      index: this.state.currentPage + 1,
    });
  };

  goPrev = () => {
    this.flatList.scrollToIndex({
      animated: true,
      index: this.state.currentPage - 1,
    });
  };

  goLast = () => {
    this.flatList.scrollToIndex({
      animated: true,
      index: this.props.pages.length - 1,
    });
  };

  _onLayout = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const { body, image, title, subtitle, backgroundColor } = item;
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;

    return (
      <Page
        body={body}
        isLight={isLight}
        image={image}
        title={title}
        subtitle={subtitle}
        width={this.state.width || Dimensions.get('window').width}
        height={this.state.height || Dimensions.get('window').height}
        imageContainerStyles={this.props.imageContainerStyles}
      />
    );
  };

  render() {
    const {
      pages,
      alterBottomColor,
      bottomBarHeight,
      controlStatusBar,
      showSkip,
      showNext,
      showDone,
      showPrev,
      onSkip,
      onDone,
      skipLabel,
      nextLabel,
      showLogin,
      loginLabel,
      prevLabel,
      SkipButtonComponent,
      DoneButtonComponent,
      NextButtonComponent,
      PrevButtonComponent,
      LoginButtonComponent,
      DotComponent,
      flatlistProps,
      skipToPage,
    } = this.props;
    const currentPage = pages[this.state.currentPage];
    const currentBackgroundColor = currentPage.backgroundColor;
    const isLight = tinycolor(currentBackgroundColor).getBrightness() > 180;
    const barStyle = isLight ? 'dark-content' : 'light-content';
    const bottomBarHighlight =
      alterBottomColor !== undefined
        ? alterBottomColor
        : this.props.bottomBarHighlight;

    let backgroundColor = currentBackgroundColor;
    if (this.state.previousPage !== null) {
      const previousBackgroundColor =
        pages[this.state.previousPage].backgroundColor;
      backgroundColor = this.state.backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [previousBackgroundColor, currentBackgroundColor],
      });
    }

    if (alterBottomColor !== undefined) {
      console.warn(
        'The prop alterBottomColor on react-native-onboarding-swiper is deprecated and will be removed soon. Use `bottomBarHighlight` instead.'
      );
    }

    const skipFun =
      skipToPage != null
        ? () => {
            this.flatList.scrollToIndex({
              animated: true,
              index: skipToPage,
            });
          }
        : onSkip;

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={{ flex: 1, backgroundColor, justifyContent: 'center' }}
      >
        {controlStatusBar && <StatusBar barStyle={barStyle} />}
        <FlatList
          ref={list => {
            this.flatList = list;
          }}
          data={pages}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onViewableItemsChanged={this.onSwipePageChange}
          viewabilityConfig={itemVisibleHotfix}
          initialNumToRender={1}
          extraData={
            this.state.width // ensure that the list re-renders on orientation change
          }
          {...flatlistProps}
        />
        <SafeAreaView style={bottomBarHighlight ? styles.overlay : {}}>
          <Pagination
            isLight={isLight}
            bottomBarHeight={bottomBarHeight}
            showSkip={showSkip}
            showNext={showNext}
            showDone={showDone}
            showPrev={showPrev}
            numPages={pages.length}
            currentPage={this.state.currentPage}
            onSkip={skipFun}
            onDone={onDone}
            onNext={this.goNext}
            onLogin={this.goLast}
            onPrev={this.goPrev}
            skipLabel={skipLabel}
            nextLabel={nextLabel}
            loginLabel={loginLabel}
            prevLabel={prevLabel}
            showLogin={showLogin}
            PrevButtonComponent={PrevButtonComponent}
            SkipButtonComponent={SkipButtonComponent}
            DoneButtonComponent={DoneButtonComponent}
            NextButtonComponent={NextButtonComponent}
            LoginButtonComponent={LoginButtonComponent}
            DotComponent={DotComponent}
          />
        </SafeAreaView>
      </Animated.View>
    );
  }
}

Onboarding.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundColor: PropTypes.string,
      body: PropTypes.element,
      image: PropTypes.element,
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.func,
      ]),
      subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    })
  ).isRequired,
  bottomBarHighlight: PropTypes.bool,
  bottomBarHeight: PropTypes.number,
  controlStatusBar: PropTypes.bool,
  showSkip: PropTypes.bool,
  showNext: PropTypes.bool,
  showDone: PropTypes.bool,
  showPrev: PropTypes.bool,
  loginLabel: PropTypes.string,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  showLogin: PropTypes.bool,
  skipLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  nextLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  prevLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  LoginButtonComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  DoneButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  PrevButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  DotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  imageContainerStyles: ViewPropTypes.style,
  transitionAnimationDuration: PropTypes.number,
  skipToPage: PropTypes.number,
};

Onboarding.defaultProps = {
  bottomBarHighlight: true,
  bottomBarHeight: 60,
  controlStatusBar: true,
  showSkip: true,
  showNext: true,
  showDone: true,
  showPrev: false,
  skipLabel: 'Skip',
  nextLabel: 'Next',
  loginLabel: 'Login',
  prevLabel: 'Prev',
  onSkip: null,
  onDone: null,
  showLogin: true,
  SkipButtonComponent: SkipButton,
  LoginButtonComponent: LoginButton,
  DoneButtonComponent: DoneButton,
  NextButtonComponent: NextButton,
  PrevButtonComponent: PrevButton,
  DotComponent: Dot,
  imageContainerStyles: null,
  transitionAnimationDuration: 500,
  skipToPage: null,
};

const styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
};

export default Onboarding;
