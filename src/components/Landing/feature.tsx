import type React from "react"
import "./feature.css"

const Features: React.FC = () => {
  const features = [
    {
      title: "Project Tracker",
      description:
        "Comprehensive project management with real-time progress tracking, task assignment, and milestone monitoring.",
      icon: "📊",
    },
    {
      title: "CPA Insights",
      description:
        "Continuous Performance Analysis provides deep insights into your productivity patterns and optimization opportunities.",
      icon: "📈",
    },
    {
      title: "Immutable Logs",
      description:
        "Blockchain-secured time logs that cannot be altered, ensuring complete transparency and accountability.",
      icon: "🔒",
    },
    {
      title: "Token Rewards",
      description:
        "Earn TimeChain tokens for completing tasks, meeting deadlines, and maintaining consistent productivity.",
      icon: "🪙",
    },
  ]

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Features Overview</h2>
          <p className="section-subtitle">Powerful tools designed to maximize your productivity and accountability</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
