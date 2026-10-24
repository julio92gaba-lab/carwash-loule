export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  }

  return (
    <div className="leading-none select-none">
      <span className={`font-script text-brand-green text-neon ${sizes[size]}`}>
        Carwash
      </span>
      <div className="font-sans text-white tracking-[0.3em] text-xs mt-1 text-center uppercase">
        Loulé
      </div>
    </div>
  )
}
