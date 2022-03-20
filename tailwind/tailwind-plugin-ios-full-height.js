// https://github.com/RVxLab/tailwind-plugin-ios-full-height/blob/main/src/plugin.js
// A TailwindCSS plugin to add utilities for 100vh on iOS
// A "feature" of WebKit is that on iOS the screen flows a bit onder the main viewport. 
// This was reported as a bug on the WebKit bug tracker and closed as WontFix.
// To fix this, there is a CSS property you can use:
// .some-element {
//     height: -webkit-fill-available;
// }
// The issue with this is that it also targets Chrome, which is exactly what you don't want in this 
// case. To go around it you can support an @supports rule to specifically target mobile:
// 
// @supports (-webkit-touch-callout: none) {
//     .some-element {
//         height: -webkit-fill-available;
//     }
// }
//
// This plugin adds 3 utility classes:
//
// min-h-screen-ios
// h-screen-ios
// h-screen-all
//
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities }) {
    const supportsTouchRule = '@supports (-webkit-touch-callout: none)';
    const webkitFillAvailable = '-webkit-fill-available';

    const utilities = {
        '.min-h-screen-ios': {
            [supportsTouchRule]: {
                minHeight: webkitFillAvailable,
            },
        },
        '.h-screen-ios': {
            [supportsTouchRule]: {
                height: webkitFillAvailable,
            },
        },
        '.h-screen-all': {
            height: '100vh',
            [supportsTouchRule]: {
                height: webkitFillAvailable,
            },
        }
    };

    addUtilities(utilities, [ 'responsive' ]);
});