import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Dots from './Dots';

const Pagination = ({
  numPages,
  currentPage,
  isLight,
  bottomBarHeight,
  showSkip,
  showNext,
  showDone,
  showPrev,
  onNext,
  onPrev,
  onSkip,
  onDone,
  skipLabel,
  nextLabel,
  loginLabel,
  prevLabel,
  showLogin,
  onLogin,
  SkipButtonComponent,
  NextButtonComponent,
  PrevButtonComponent,
  DoneButtonComponent,
  LoginButtonComponent,
  DotComponent,
}) => {
  const isLastPage = currentPage + 1 === numPages;
  const isFirstPage = currentPage === 0;

  const SkipButtonFinal = showSkip && !showLogin && !isLastPage && (
    <SkipButtonComponent
      isLight={isLight}
      skipLabel={skipLabel}
      onPress={() => {
        if (typeof onSkip === 'function') {
          StatusBar.setBarStyle('default', true);
          onSkip();
        }
      }}
    />
  );

  const PrevButtonFinal = showPrev &&
    !showSkip &&
    !showLogin &&
    !isFirstPage && (
      <PrevButtonComponent
        prevLabel={prevLabel}
        isLight={isLight}
        onPress={onPrev}
      />
    );

  const NextButtonFinal = showNext && !isLastPage && (
    <NextButtonComponent
      nextLabel={nextLabel}
      isLight={isLight}
      onPress={onNext}
    />
  );

  const LoginButtonFinal = showLogin && !isLastPage && (
    <LoginButtonComponent
      loginLabel={loginLabel}
      isLight={isLight}
      onPress={onLogin}
    />
  );

  const DoneButtonFinal = showDone && isLastPage && (
    <DoneButtonComponent
      isLight={isLight}
      onPress={() => {
        if (typeof onDone === 'function') {
          StatusBar.setBarStyle('default', true);
          onDone();
        }
      }}
    />
  );

  return (
    <View
      style={{
        height: bottomBarHeight,
        ...styles.container,
      }}
    >
      <View style={styles.buttonLeft}>
        {SkipButtonFinal}
        {LoginButtonFinal}
        {PrevButtonFinal}
      </View>
      <Dots
        isLight={isLight}
        numPages={numPages}
        currentPage={currentPage}
        Dot={DotComponent}
        style={styles.dots}
      />
      <View style={styles.buttonRight}>
        {NextButtonFinal}
        {DoneButtonFinal}
      </View>
    </View>
  );
};

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLight: PropTypes.bool.isRequired,
  bottomBarHeight: PropTypes.number.isRequired,
  showNext: PropTypes.bool.isRequired,
  showSkip: PropTypes.bool.isRequired,
  showDone: PropTypes.bool.isRequired,
  showPrev: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  onLogin: PropTypes.func,
  prevLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  skipLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  nextLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  DoneButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  PrevButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  LoginButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  DotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

const styles = {
  container: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLeft: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  buttonRight: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  dots: {
    flexShrink: 0,
  },
};

export default Pagination;
