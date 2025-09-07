"use client"

import { useState, useEffect } from "react"
import { Award, Heart, Sparkles, Users } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { brandStory } from "../../data/collections"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { AuthProvider } from "../../contexts/AuthContext"

function BrandContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("aurelia-cart")
    const savedFavorites = localStorage.getItem("aurelia-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onCartOpen={() => {}}
        onFavoritesOpen={() => {}}
      />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-background to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-serif font-bold text-foreground text-balance">The Aurelia Story</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                  Where luxury meets authenticity, and every product tells a story of craftsmanship, innovation, and the
                  timeless pursuit of beauty.
                </p>
              </div>
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Est. {brandStory.heritage.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Trusted by 100K+ customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Cruelty-free & sustainable</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story Sections */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {/* Heritage */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-serif font-bold text-foreground">{brandStory.heritage.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                    {brandStory.heritage.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">{brandStory.heritage.year}</div>
                    <div className="text-sm text-muted-foreground">
                      <div>Year Founded</div>
                      <div>Paris, France</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/luxury-foundation-bottle-beige-pump-minimal-backgr.jpg"
                    alt="Aurelia Heritage"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Philosophy */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/serum-dropper-bottle-luxury-skincare-minimal-backg.jpg"
                    alt="Aurelia Philosophy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-serif font-bold text-foreground">{brandStory.philosophy.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                    {brandStory.philosophy.content}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">100%</div>
                        <div className="text-sm text-muted-foreground">Cruelty-Free</div>
                      </CardContent>
                    </Card>
                    <Card className="border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">25+</div>
                        <div className="text-sm text-muted-foreground">Premium Products</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Craftsmanship */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-serif font-bold text-foreground">{brandStory.craftsmanship.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                    {brandStory.craftsmanship.content}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Premium ingredients sourced globally</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Rigorous quality testing standards</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Sustainable packaging initiatives</span>
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/eyeshadow-palette-nude-brown-shades-luxury-case.jpg"
                    alt="Aurelia Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                The principles that guide everything we do at Aurelia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-border/50">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Innovation</h3>
                  <p className="text-muted-foreground text-pretty">
                    Constantly pushing boundaries to create breakthrough formulations that deliver exceptional results.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-border/50">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Authenticity</h3>
                  <p className="text-muted-foreground text-pretty">
                    Staying true to our values while celebrating the unique beauty in every individual.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-border/50">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Excellence</h3>
                  <p className="text-muted-foreground text-pretty">
                    Maintaining the highest standards in every aspect, from formulation to customer experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function BrandPage() {
  return (
    <AuthProvider>
      <BrandContent />
    </AuthProvider>
  )
}
