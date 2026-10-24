import Reveal from './Reveal'
import { ClockIcon, SparkleIcon, BadgeIcon, DropletIcon } from './icons'

const items = [
  [ClockIcon, 'Agendamento Rápido', 'Marque em poucos cliques, sem conta.'],
  [SparkleIcon, 'Alta Performance', 'Química profissional, resultado duradouro.'],
  [BadgeIcon, 'Profissionais Qualificados', 'Equipa experiente, atenção ao detalhe.'],
  [DropletIcon, 'Sem Burocracia', 'Só pedimos o essencial para agendar.'],
]

export default function Differentials() {
  return (
    <section className="bg-brand-dark py-6 px-5 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1 rounded-3xl overflow-hidden border border-white/10 bg-brand-dark2">
        {items.map(([Icon, title, text], i) => (
          <Reveal key={title} delay={i * 100} className="text-left p-5 sm:p-6 border-r last:border-r-0 border-white/10 hover:bg-white/[.025] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-white font-semibold text-sm leading-tight">{title}</div>
            <div className="text-white/45 text-xs mt-2 leading-relaxed">{text}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
