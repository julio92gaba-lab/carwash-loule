import { useEffect, useMemo, useRef, useState } from 'react'
import Reveal from './Reveal'
import { services, vehicleCategories } from '../lib/demoContent'
import { VehicleIconFor } from './icons'

const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

function atMidnight(date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function availabilityFor(day, today) {
  if (day < today) return 'past'
  return 'open'
}

function slotsFor(service, day) {
  if (!day) return []
  const openings = []
  const closingMinutes = 19 * 60
  for (let minutes = 9 * 60; minutes + service.durationMinutes <= closingMinutes; minutes += 30) {
    openings.push(`${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`)
  }
  return openings
}

function calendarDays(month) {
  const start = new Date(month.getFullYear(), month.getMonth(), 1)
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const leading = (start.getDay() + 6) % 7
  return [...Array(leading).fill(null), ...Array.from({ length: total }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1))]
}

const statusStyles = {
  open: 'border-brand-green/35 bg-brand-green/10 text-white hover:border-brand-green hover:bg-brand-green/15',
  busy: 'border-amber-400/50 bg-amber-400/10 text-white hover:border-amber-300',
  full: 'border-red-400/35 bg-red-400/10 text-white/55 cursor-not-allowed',
  past: 'border-white/5 bg-white/[.02] text-white/20 cursor-not-allowed',
}

function priceFor(service, vehicle) {
  return service.prices[vehicle] ?? service.price
}

export default function BookingSection() {
  const [step, setStep] = useState(1)
  const [vehicle, setVehicle] = useState('citadino')
  const [serviceId, setServiceId] = useState('completa')
  const [month, setMonth] = useState(() => new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [time, setTime] = useState(null)
  const [sendEmail, setSendEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const formRef = useRef(null)
  const previousStep = useRef(step)
  const today = useMemo(() => atMidnight(new Date()), [])
  const selectedService = services.find((item) => item.id === serviceId)
  const selectedPrice = priceFor(selectedService, vehicle)
  const days = calendarDays(month)
  const slots = slotsFor(selectedService, selectedDay)
  const isCurrentMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth()

  useEffect(() => {
    if (previousStep.current !== step) {
      requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      previousStep.current = step
    }
  }, [step])

  useEffect(() => {
    if (done) {
      requestAnimationFrame(() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [done])

  function chooseDay(day) {
    const status = availabilityFor(day, today)
    if (status === 'past' || status === 'full') return
    setSelectedDay(day)
    setTime(null)
  }

  function next() {
    if (step === 1) setStep(2)
    else if (step === 2 && selectedDay && time) setStep(3)
    else if (step === 3) setDone(true)
  }

  if (done) return <section id="agendar" className="bg-brand-dark py-16 md:py-28 px-5 relative overflow-hidden"><div className="grid-glow absolute inset-0 opacity-25" /><div className="relative max-w-xl mx-auto rounded-[2rem] p-7 sm:p-10 text-center bg-brand-dark2 border border-brand-green/30 shadow-neon"><div className="w-16 h-16 bg-brand-green text-black rounded-full flex items-center justify-center text-3xl mx-auto">✓</div><h2 className="text-white text-3xl font-semibold mt-6">Agendamento concluído.</h2><p className="text-white/55 mt-3">O seu horário ficou reservado. {sendEmail && 'Enviaremos os detalhes para o seu e-mail.'}</p><button onClick={() => { setDone(false); setStep(1); setSelectedDay(null); setTime(null); setSendEmail(false); setEmail('') }} className="mt-7 text-brand-green text-sm font-semibold hover:text-white transition-all duration-300">Fazer novo agendamento</button></div></section>

  return (
    <section id="agendar" className="bg-brand-dark py-16 md:py-28 px-5 relative overflow-hidden">
      <div className="absolute inset-0 grid-glow opacity-25" />
      <div className="relative mx-auto grid w-full max-w-[1380px] items-start gap-10 lg:grid-cols-[.72fr_1.28fr]">
        <Reveal className="lg:sticky lg:top-28"><p className="text-brand-green text-xs uppercase tracking-[.25em] font-semibold">Reserve a sua vaga</p><h2 className="text-white text-4xl md:text-5xl font-bold tracking-[-.04em] leading-tight mt-4">Agendar ficou<br /><span className="text-brand-green text-neon">mais simples.</span></h2><p className="text-white/55 mt-5 max-w-sm leading-relaxed">Escolha o cuidado, consulte o mês completo e selecione o horário que melhor encaixa no seu dia.</p></Reveal>

        <div ref={formRef} className="scroll-mt-24"><Reveal delay={100} className="bg-brand-dark2/95 border border-white/10 rounded-[2rem] p-5 sm:p-8 shadow-2xl shadow-black/30">
          <div className="flex gap-2 mb-9">{['Serviço', 'Data e hora', 'Confirmar'].map((label, index) => { const number = index + 1; return <div key={label} className="flex-1"><div className={`h-1 rounded-full ${number <= step ? 'bg-brand-green' : 'bg-white/10'}`} /><p className={`text-xs mt-2 ${number === step ? 'text-brand-green' : 'text-white/35'}`}>{number}. {label}</p></div> })}</div>

          {step === 1 && <div className="animate-page-in"><h3 className="text-white text-xl font-semibold">Como é o seu veículo?</h3><div className="grid sm:grid-cols-2 gap-3 mt-5">{vehicleCategories.map((item) => <button key={item.id} onClick={() => setVehicle(item.id)} className={`p-4 text-left rounded-2xl border flex items-center gap-3 transition-all duration-300 ${vehicle === item.id ? 'border-brand-green bg-brand-green/10 text-brand-green' : 'border-white/10 text-white/70 hover:border-white/35'}`}><VehicleIconFor id={item.id} className="w-7 h-7" /><span className="text-sm font-medium">{item.label}</span></button>)}</div><h3 className="text-white text-xl font-semibold mt-9">Escolha o cuidado</h3><div className="space-y-3 mt-5">{services.map((item) => <button key={item.id} onClick={() => setServiceId(item.id)} className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 ${serviceId === item.id ? 'border-brand-green bg-brand-green/10' : 'border-white/10 hover:border-white/35'}`}><div><p className={serviceId === item.id ? 'text-brand-green font-medium' : 'text-white font-medium'}>{item.label}</p><p className="text-white/40 text-xs mt-1">{item.duration} · {item.description}</p></div><span className="text-right"><span className="block text-white/35 text-[10px] uppercase tracking-wide">a partir de</span><span className="text-white text-lg font-semibold">{priceFor(item, vehicle)} €</span></span></button>)}</div></div>}

          {step === 2 && (
            <div className="animate-page-in">
              <div className="flex items-center justify-between gap-4"><div><h3 className="text-white text-xl font-semibold">Escolha uma data</h3><p className="text-white/40 text-xs mt-1">Os horários aparecem depois da seleção.</p></div><div className="flex gap-2"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} disabled={isCurrentMonth} className="w-9 h-9 rounded-lg border border-white/10 text-white/70 disabled:opacity-20 hover:border-brand-green transition-all duration-300">‹</button><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="w-9 h-9 rounded-lg border border-white/10 text-white/70 hover:border-brand-green transition-all duration-300">›</button></div></div>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-white/55"><span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-brand-green" />Boa disponibilidade</span></div>
              <p className="text-brand-green text-sm font-medium capitalize mt-6">{month.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}</p>
              <div className="grid grid-cols-7 gap-1.5 mt-3">
                {weekdays.map((weekday) => <span key={weekday} className="text-center text-[10px] text-white/35 uppercase py-1">{weekday}</span>)}
                {days.map((day, index) => {
                  if (!day) return <span key={`blank-${index}`} />
                  const status = availabilityFor(day, today)
                  const active = selectedDay?.toDateString() === day.toDateString()
                  const activeStyle = active ? 'ring-2 ring-brand-green ring-offset-2 ring-offset-brand-dark2 border-brand-green bg-brand-green text-black font-bold' : ''
                  return <button key={day.toISOString()} disabled={status === 'past'} onClick={() => chooseDay(day)} className={`relative h-11 sm:h-12 rounded-xl border text-sm transition-all duration-300 ${statusStyles[status]} ${activeStyle}`}><span>{day.getDate()}</span>{status !== 'past' && <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-green" />}</button>
                })}
              </div>
              {selectedDay && <div className="mt-8 pt-6 border-t border-white/10 animate-page-in"><div className="flex items-baseline justify-between"><h4 className="text-white font-semibold">Horários para {selectedDay.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}</h4><span className="text-brand-green text-xs">{selectedService.duration}</span></div>{slots.length ? <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">{slots.map((slot) => <button key={slot} onClick={() => setTime(slot)} className={`rounded-xl py-3 border text-sm transition-all duration-300 ${time === slot ? 'border-brand-green bg-brand-green text-black font-semibold' : 'border-white/10 text-white/65 hover:border-brand-green/60'}`}>{slot}</button>)}</div> : <p className="text-red-300 text-sm mt-4">Este dia já não comporta a duração deste serviço. Escolha outra data.</p>}</div>}
            </div>
          )}

          {step === 3 && <div className="animate-page-in"><h3 className="text-white text-xl font-semibold">Confirme o agendamento</h3><div className="mt-6 rounded-2xl bg-black/20 border border-white/10 p-5 space-y-4 text-sm"><div className="flex justify-between gap-4"><span className="text-white/45">Serviço</span><span className="text-white text-right">{selectedService.label}</span></div><div className="flex justify-between gap-4"><span className="text-white/45">Veículo</span><span className="text-white text-right">{vehicleCategories.find((item) => item.id === vehicle).label}</span></div><div className="flex justify-between gap-4"><span className="text-white/45">Data e hora</span><span className="text-white text-right">{selectedDay?.toLocaleDateString('pt-PT')} · {time}</span></div><div className="flex justify-between gap-4 pt-4 border-t border-white/10"><span className="text-white/65">Valor estimado</span><span className="text-brand-green font-semibold text-lg">{selectedPrice} €</span></div></div><label className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 cursor-pointer"><input type="checkbox" checked={sendEmail} onChange={(event) => setSendEmail(event.target.checked)} className="mt-1 accent-brand-green" /><span><span className="block text-white text-sm font-medium">Receber confirmação por e-mail</span><span className="block text-white/45 text-xs mt-1">Enviaremos o resumo do seu agendamento.</span></span></label>{sendEmail && <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="O seu e-mail" required className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand-green transition-all duration-300" />}</div>}

          <div className="mt-8 flex gap-3"><button onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1} className="px-5 py-3 rounded-full border border-white/15 text-white/65 text-sm disabled:opacity-0 transition-all duration-300">Voltar</button><button onClick={next} disabled={(step === 2 && (!selectedDay || !time)) || (step === 3 && sendEmail && !email)} className="flex-1 bg-brand-green text-black py-3 rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-neon disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300">{step === 3 ? 'Concluir agendamento' : 'Continuar'}</button></div>
        </Reveal></div>
      </div>
    </section>
  )
}
