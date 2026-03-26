import SectionTitle from '../components/SectionTitle'

const stats = [
  {
    label: 'Waste awareness',
    value: 'Better sorting',
    text: 'Clear disposal guidance reduces contamination in recycling streams.',
  },
  {
    label: 'Climate connection',
    value: 'Lower emissions',
    text: 'Less landfill waste can help reduce methane and other harmful pollutants.',
  },
  {
    label: 'Circular systems',
    value: 'More reuse',
    text: 'Recycling and composting keep materials in use for longer.',
  },
]

export default function SdgPage() {
  return (
    <div className="page-stack">
      <section className="glass-card">
        <SectionTitle
          eyebrow="About SDG 12"
          title="Responsible consumption and production starts with everyday choices"
          text="Sustainable Development Goal 12 encourages people, communities, and systems to use resources wisely and manage waste responsibly."
        />

        <div className="sdg-grid">
          <article className="sdg-copy">
            <h3>What SDG 12 is</h3>
            <p>
              SDG 12 is a global goal focused on reducing waste, improving resource
              efficiency, and promoting more sustainable production and consumption
              patterns.
            </p>

            <h3>Why waste matters</h3>
            <p>
              Poor disposal decisions lead to land, water, and air pollution. They
              also make recycling harder and increase pressure on natural systems.
            </p>
          </article>

          <div className="stat-stack">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
