export function CarIcon(props) {
  return (
    <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 35 L10 28 Q10 22 18 20 L28 10 Q32 6 40 6 L62 6 Q70 6 74 12 L82 20 Q92 20 92 30 L92 35" />
      <line x1="10" y1="35" x2="92" y2="35" />
      <line x1="28" y1="20" x2="82" y2="20" />
      <circle cx="28" cy="38" r="7" />
      <circle cx="74" cy="38" r="7" />
    </svg>
  )
}
export function MotoIcon(props) {
  return (
    <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="20" cy="38" r="9" />
      <circle cx="80" cy="38" r="9" />
      <path d="M20 38 L40 24 L58 24 L80 38" />
      <path d="M40 24 L46 12 L60 12" />
      <path d="M58 24 L52 38" />
    </svg>
  )
}
export function VanIcon(props) {
  return (
    <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 36 L8 18 Q8 14 12 14 L60 14 Q66 14 70 20 L92 20 Q96 20 96 26 L96 36" />
      <line x1="8" y1="36" x2="96" y2="36" />
      <line x1="60" y1="14" x2="60" y2="36" />
      <circle cx="26" cy="39" r="7" />
      <circle cx="80" cy="39" r="7" />
    </svg>
  )
}
export function DropletIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2 C12 2 5 11 5 15.5 C5 19.6 8.4 23 12 23 C15.6 23 19 19.6 19 15.5 C19 11 12 2 12 2 Z" />
    </svg>
  )
}
export function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 L12 12 L16 14" />
    </svg>
  )
}
export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2 L14 9 L21 11 L14 13 L12 20 L10 13 L3 11 L10 9 Z" />
    </svg>
  )
}
export function BadgeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M8 13 L6 21 L12 18 L18 21 L16 13" />
    </svg>
  )
}
export function VehicleIconFor({ id, className }) {
  if (id === 'moto') return <MotoIcon className={className} />
  if (id === 'suv' || id === 'carrinha') return <VanIcon className={className} />
  return <CarIcon className={className} />
}
