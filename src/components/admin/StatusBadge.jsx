const styles = {
  agendado: 'bg-blue-50 text-blue-700',
  em_curso: 'bg-amber-50 text-amber-700',
  concluido: 'bg-green-50 text-green-700',
  cancelado: 'bg-gray-100 text-gray-500',
}

const labels = {
  agendado: 'Agendado',
  em_curso: 'Em curso',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
