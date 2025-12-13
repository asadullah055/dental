export default function PricingPage() {
  const plans = [
    {
      title: "Basic Plan",
      price: "$9.99",
      duration: "/month",
      description:
        "Great if you want to try the service before committing longer.",
      features: [
        "Unlimited AI meal plans",
        "AI nutrition insights",
        "Cancel anytime",
      ],
      buttonText: "Basic",
    },
    {
      title: "Professional Plan",
      price: "$39.99",
      duration: "/month",
      tag: "MOST POPULAR",
      description:
        "Perfect for ongoing, month-to-month meal planning and features.",
      features: [
        "Unlimited AI meal plans",
        "Priority AI support",
        "Cancel anytime",
      ],
      buttonText: "Professional",
    },
    {
      title: "Premium Plan",
      price: "$299.99",
      duration: "/month",
      description:
        "Best value for those committed to improving their diet long-term.",
      features: [
        "Unlimited AI meal plans",
        "All premium features",
        "Cancel anytime",
        "Cancel anytime",
      ],
      buttonText: "Premium",
    },
  ];

  return (
    <div className="min-h-screen w-full flex justify-center bg-white px-6 py-16">
      {/* Header */}
      <div>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900">Pricing</h2>
          <p className="text-gray-600 mt-2 text-base">
            Get started on our weekly plan or upgrade to monthly or yearly when
            you're ready.
          </p>
        </div>

        {/* Responsive Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 shadow-lg bg-white p-8 flex flex-col relative"
            >
              {/* Badge */}
              {plan.tag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.tag}
                </span>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mt-6">
                {plan.title}
              </h3>

              <div className="mt-5 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-600">{plan.duration}</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6 text-sm">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-emerald-600 text-lg">✔</span> {f}
                  </li>
                ))}
              </ul>

              {/* Neon Gradient Button */}
              <button
                className="
                mt-auto w-full py-3 rounded-xl text-gray-900 font-semibold
                bg-gradient-to-r from-[#00ffbb] to-[#03ffff]
                shadow-[0_0_20px_rgba(0,255,200,0.4)]
                hover:shadow-[0_0_30px_rgba(0,255,200,0.6)]
                transition-all duration-300 cursor-pointer 
              "
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
