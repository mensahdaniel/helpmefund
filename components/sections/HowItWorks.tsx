export function HowItWorks() {
  const steps = [
    {
      title: "Submit Your Project",
      description:
        "Create and submit your project with details and funding goals",
      icon: "📝",
    },
    {
      title: "Get Approved",
      description: "Our team reviews your project to ensure quality",
      icon: "✅",
    },
    {
      title: "Receive Funding",
      description: "Connect with sponsors and receive funding",
      icon: "💰",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">Simple steps to get started</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
