"use client"

import { Button } from "./ui/button"

export default function Hero() {
  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-background via-card to-secondary min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance">
                Enhance Your
                <span className="text-primary block">Natural Glow</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Discover luxury makeup crafted for the modern woman. Our premium collection celebrates your unique
                beauty with sophisticated formulas and timeless elegance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium"
                onClick={scrollToShop}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-medium bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-luxury-makeup-collection-rose-gold-beige.jpg"
                alt="Elegant luxury makeup collection with rose gold and beige tones"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Cruelty Free</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
