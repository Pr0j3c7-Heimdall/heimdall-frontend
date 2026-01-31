const iconStyle = { width: 24, height: 24, stroke: 'currentColor', strokeWidth: 2, fill: 'none' };

export const Icons = {
  image: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M9 2v4M15 2v4M12 2v2M9 6h6v6l4 6H5l4-6V6zM9 12v6M15 12v6" strokeLinecap="round" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" style={{ ...iconStyle, width: 20, height: 20 }}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export default Icons;
