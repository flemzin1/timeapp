import type React from "react"
import "./howItWorks.css"

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Wallet",
      description: "Connect your Sui wallet to access the TimeChain platform and start your productivity journey.",
    },
    {
      number: "02",
      title: "Create Project",
      description: "Set up your project with clear goals, deadlines, and complexity ratings for optimal tracking.",
    },
    {
      number: "03",
      title: "Assign Tasks",
      description: "Break down your project into manageable tasks with time estimates and priority levels.",
    },
    {
      number: "04",
      title: "Track with CPA",
      description: "Use our Continuous Performance Analysis to monitor progress and maintain accountability.",
    },
   
  ]

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Five simple steps to transform your productivity with blockchain accountability
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
