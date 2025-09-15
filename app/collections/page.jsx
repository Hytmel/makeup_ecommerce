"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { collections } from "../../data/collections"
import { products } from "../../data/products"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

function CollectionsContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem("aurelia-cart")
    const savedFavorites = localStorage.getItem("aurelia-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  const getProductsByIds = (productIds) => {
    return products.filter((product) => productIds.includes(product.id))
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onCartOpen={() => {}}
        onFavoritesOpen={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4 text-balance">Curated Collections</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our carefully curated collections, each telling a unique story of luxury and elegance
          </p>
        </div>

        {/* Featured Collections */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections
              .filter((collection) => collection.featured)
              .map((collection) => (
                <Card
                  key={collection.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  onClick={() => router.push(`/collections/${collection.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {collection.name}
                        </h3>
                        <Badge variant="secondary">{getProductsByIds(collection.products).length} items</Badge>
                      </div>
                      <p className="text-muted-foreground text-pretty">{collection.description}</p>
                      <Button variant="ghost" className="group-hover:text-primary p-0 h-auto font-medium">
                        Explore Collection
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Collections */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => router.push(`/collections/${collection.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {collection.name}
                        </h3>
                        <Badge variant={collection.featured ? "default" : "secondary"}>
                          {collection.featured ? "Featured" : `${getProductsByIds(collection.products).length} items`}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground text-pretty">{collection.description}</p>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary p-0 h-auto">
                        View Collection
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function CollectionsPage() {
  return (
    <CollectionsContent />
  )
}
