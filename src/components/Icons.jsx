// Iconos de linea del mockup. Toman el color del texto (currentColor) y el
// tamaño de la clase .icon (tokens.css), salvo que se pase otra clase.

function Svg({ className = 'icon', strokeWidth = 2, children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export const ChatIcon = (props) => (
  <Svg {...props}>
    <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
  </Svg>
)

export const ArrowIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const CheckIcon = (props) => (
  <Svg strokeWidth={2.4} {...props}>
    <path d="M4 12l5 5L20 6" />
  </Svg>
)

export const PlusIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14M12 5v14" />
  </Svg>
)

export const MinusIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14" />
  </Svg>
)

export const ClockIcon = (props) => (
  <Svg strokeWidth={1.8} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
)

export const CardIcon = (props) => (
  <Svg strokeWidth={1.8} {...props}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="1" />
    <path d="M2.5 10h19" />
  </Svg>
)

export const PlayIcon = ({ className = 'icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M8 5l11 7-11 7z" fill="currentColor" />
  </svg>
)

// Iconos de "Que ofrecemos", en el orden de offer.items.
export const offerIcons = [
  (props) => (
    <Svg strokeWidth={1.6} {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 9.5l3.5 2.5-3.5 2.5z" />
    </Svg>
  ),
  (props) => (
    <Svg strokeWidth={1.6} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" />
    </Svg>
  ),
  (props) => (
    <Svg strokeWidth={1.6} {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.2 8.2L20 20M8.2 15.8L20 4" />
    </Svg>
  ),
  (props) => (
    <Svg strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="3" y="13" width="8" height="8" />
      <path d="M13 17h8M17 13v8" />
    </Svg>
  ),
  (props) => (
    <Svg strokeWidth={1.6} {...props}>
      <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" />
      <path d="M4 3v5h5" />
      <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" />
      <path d="M20 21v-5h-5" />
    </Svg>
  ),
]
