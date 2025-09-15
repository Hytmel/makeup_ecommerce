import { Award, Heart, Leaf, Sparkles } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Algerian‑First Curation",
    description: "Handpicked brands and products tailored for Algerian customers.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Halal‑Friendly Options",
    description: "Highlighting halal‑friendly picks when provided by the brand.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Cash on Delivery (COD)",
    description: "Convenient COD available in many wilayas with clear delivery fees.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Transparent DZD Pricing",
    description: "Prices shown in Algerian dinar with no surprises at checkout.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold text-foreground text-balance">About Elixir DZ Marketplace</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                We help Algerian shoppers discover trusted local beauty brands with clear DZD pricing and easy delivery.
                From emerging labels to established names, we curate products that fit Algeria’s needs and routines.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Our focus is simple: verified sellers, halal‑friendly selections where applicable, cash‑on‑delivery in
                many wilayas, and great support. Shop confidently with real photos, transparent prices, and a smooth
                experience.
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <img
              src="/luxury-foundation-bottle-beige-pump-minimal-backgr.jpg"
              alt="Algerian beauty marketplace"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-border bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
