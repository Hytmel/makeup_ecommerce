import { Award, Heart, Leaf, Sparkles } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Premium Quality",
    description: "Carefully crafted formulas using the finest ingredients for exceptional results.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Cruelty-Free",
    description: "100% cruelty-free and ethically sourced. Beauty without compromise.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Award-Winning",
    description: "Recognized by beauty experts and loved by customers worldwide.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Made with Love",
    description: "Every product is created with passion and attention to detail.",
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
              <h2 className="text-4xl font-serif font-bold text-foreground text-balance">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Founded with a vision to celebrate natural beauty, Aurelia represents the perfect fusion of luxury and
                authenticity. We believe that makeup should enhance, not mask, your unique radiance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Each product in our collection is meticulously crafted using premium ingredients and innovative
                formulas. From our signature rose gold packaging to our commitment to cruelty-free practices, every
                detail reflects our dedication to excellence.
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Aurelia makeup collection"
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
