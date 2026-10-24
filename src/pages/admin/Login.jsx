import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import { useAuth } from '../../lib/auth'

export default function Login() {
  const { session, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) setError('Credenciais inválidas.')
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-brand-dark px-5 py-10">
      <div className="absolute inset-0 grid-glow opacity-35" /><div className="absolute -left-32 -bottom-32 w-[34rem] h-[34rem] rounded-full bg-brand-green/10 blur-[120px]" /><div className="absolute top-0 right-0 w-1/2 h-full bg-brand-dark2/70 skew-x-[-12deg] translate-x-1/3 border-l border-white/5" />
      <div className="relative w-full max-w-5xl grid lg:grid-cols-[.9fr_1.1fr] rounded-[2rem] overflow-hidden border border-white/10 bg-brand-dark2/80 shadow-2xl shadow-black/60">
        <div className="p-8 sm:p-12 flex flex-col justify-between min-h-[300px] bg-gradient-to-br from-brand-green/15 to-transparent">
          <Logo size="md" />
          <div className="mt-16"><p className="text-brand-green text-xs uppercase tracking-[.25em] font-semibold">Área reservada</p><h1 className="text-white text-4xl font-semibold tracking-[-.04em] leading-tight mt-4">Gestão simples.<br />Visão completa.</h1><p className="text-white/50 text-sm mt-5 max-w-xs">Acompanhe a agenda, clientes e operação do Carwash Loulé num só lugar.</p></div>
          <p className="text-white/30 text-xs mt-10">Pré-visualização do sistema administrativo</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-brand-dark/75 backdrop-blur">
        <div className="inline-flex gap-2 items-center text-brand-green text-xs border border-brand-green/20 bg-brand-green/5 rounded-full px-3 py-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-green" />Acesso do proprietário</div>
        <h2 className="text-2xl font-semibold mt-6 text-white">Entrar no sistema</h2><p className="text-white/45 text-sm mt-2 mb-8">Use qualquer email para percorrer a pré-visualização.</p>
        <label className="block text-sm text-white/70 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green transition-all duration-300 mb-5"
          required
        />
        <label className="block text-sm text-white/70 mb-2">Palavra-passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green transition-all duration-300 mb-4"
          required
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-green text-black rounded-xl py-3.5 font-semibold hover:-translate-y-0.5 hover:shadow-neon disabled:opacity-50 transition-all duration-300"
        >
          {submitting ? 'A entrar...' : 'Aceder ao sistema'}
        </button>
        <p className="text-white/30 text-xs text-center mt-5">Nesta fase, o acesso não valida nem guarda credenciais.</p>
      </form>
      </div>
    </div>
  )
}
