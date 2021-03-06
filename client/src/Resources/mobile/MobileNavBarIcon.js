import React from 'react'

function MobileNavBarIcon({ height, width }) {
  return React.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 69 78',
        stroke: 'currentColor',
      },
      { width, height },
    ),
    React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 0,
      d:
        'M4.2721 0H57.1397L32.0409 13.7027L68.5524 67.9994C69.6684 69.6593 68.5817 71.8932 66.5726 72.072L0 78L34.7684 64.1791C36.7319 63.3991 37.5721 61.1064 36.5693 59.2669L4.2721 0Z',
      fill: '#fd4d4d',
    }),
  )
}

export default MobileNavBarIcon
