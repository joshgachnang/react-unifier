import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Text, View, ViewPropTypes } from 'react-native';

const Page = ({
  isLight,
  image,
  title,
  body,
  subtitle,
  width,
  height,
  imageContainerStyles,
}) => {
  let titleElement = title;
  if (typeof title === 'string' || title instanceof String) {
    titleElement = (
      <View style={styles.padding}>
        <Text style={[styles.title, isLight ? styles.titleLight : {}]}>
          {title}
        </Text>
      </View>
    );
  }

  let subtitleElement = subtitle;
  if (typeof subtitle === 'string' || subtitle instanceof String) {
    subtitleElement = (
      <View style={styles.padding}>
        <Text style={[styles.subtitle, isLight ? styles.subtitleLight : {}]}>
          {subtitle}
        </Text>
      </View>
    );
  }

  if (body) {
    return <View style={[styles.container, { width, height }]}>{body}</View>;
  } else {
    return (
      <View style={[styles.container, { width, height }]}>
        <View style={[styles.imageContainer, imageContainerStyles]}>
          {image}
        </View>
        {titleElement}
        {subtitleElement}
      </View>
    );
  }
};

Page.propTypes = {
  body: PropTypes.element,
  isLight: PropTypes.bool,
  image: PropTypes.element,
  imageContainerStyles: ViewPropTypes.style,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  width: PropTypes.number,
  height: PropTypes.number,
};

Page.defaultProps = {
  imageContainerStyles: null,
};

const { width, height } = Dimensions.get('window');
const potrait = height > width;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: potrait ? 'center' : 'flex-start',
    paddingTop: potrait ? 0 : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0,
    paddingBottom: potrait ? 10 : 10,
    paddingTop: potrait ? 20 : 10,
    alignItems: 'center',
    width: '100%',
  },
  padding: {
    paddingHorizontal: 4,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    color: '#eee',
    paddingBottom: 8,
  },
  titleLight: {
    color: '#111',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  subtitleLight: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
};

export default Page;
