// Simple emoji-based logo component
export const JournalEmojiLogo = ({ size = 48, className = "" }) => {
  return (
    <div className={`journal-app-logo ${className}`} style={{ width: size, height: size, fontSize: size * 0.5 }}>
      📖
    </div>
  )
}

// SVG-based journal logo component
export const JournalSVGLogo = ({ size = 48, className = "" }) => {
  return (
    <svg
      className={`journal-logo-svg ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Book cover */}
      <rect x="8" y="6" width="32" height="36" rx="4" fill="url(#bookGradient)" stroke="#d97706" strokeWidth="2" />

      {/* Book spine */}
      <rect x="8" y="6" width="4" height="36" rx="2" fill="#b45309" />

      {/* Pages */}
      <rect x="16" y="12" width="20" height="2" rx="1" fill="#92400e" opacity="0.6" />
      <rect x="16" y="18" width="16" height="2" rx="1" fill="#92400e" opacity="0.6" />
      <rect x="16" y="24" width="18" height="2" rx="1" fill="#92400e" opacity="0.6" />
      <rect x="16" y="30" width="14" height="2" rx="1" fill="#92400e" opacity="0.6" />

      {/* Pen/Quill */}
      <path d="M35 15L37 13C37.5 12.5 38.5 12.5 39 13C39.5 13.5 39.5 14.5 39 15L37 17L35 15Z" fill="#dc2626" />
      <path d="M35 15L33 17L31 19L32 20L34 18L36 16L35 15Z" fill="#fbbf24" />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// App brand component with logo and text
export const AppBrand = ({ showText = true, logoSize = 48 }) => {
  return (
    <div className="app-brand">
      <JournalSVGLogo size={logoSize} />
      {showText && <h1 className="app-brand-text">JournalApp</h1>}
    </div>
  )
}

export default JournalSVGLogo
