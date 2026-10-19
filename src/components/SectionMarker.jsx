// Marcador decorativo de seccion: "[04]" seguido de una regla con ticks.
// Los corchetes los pone el CSS; aca solo va el numero de seccion.
export default function SectionMarker({ number }) {
  return (
    <div className="section-marker" aria-hidden="true">
      <span className="section-marker__number">{number}</span>
      <span className="section-marker__rule" />
    </div>
  )
}
