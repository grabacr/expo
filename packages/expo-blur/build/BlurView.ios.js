import PropTypes from 'prop-types';
import * as React from 'react';
import { ViewPropTypes } from 'react-native';
import { requireNativeViewManager } from 'expo-core';
export default class BlurView extends React.Component {
    render() {
        let { style, ...props } = this.props;
        return <NativeBlurView {...props} style={[style, { backgroundColor: 'transparent' }]}/>;
    }
}
BlurView.propTypes = {
    ...ViewPropTypes,
    tint: PropTypes.oneOf(['light', 'default', 'dark']).isRequired,
    intensity: PropTypes.number.isRequired,
};
BlurView.defaultProps = {
    tint: 'default',
    intensity: 50,
};
const NativeBlurView = requireNativeViewManager('ExpoBlurView');
//# sourceMappingURL=BlurView.ios.js.map