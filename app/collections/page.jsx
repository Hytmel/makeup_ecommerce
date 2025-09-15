"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { collectionsDz } from "../../data/collections_dz"
import { products } from "../../data/products"

function CollectionsContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [items, setItems] = useState([]) // static DZ collections
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem("elixirdz-cart")
    const savedFavorites = localStorage.getItem("elixirdz-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    setItems(collectionsDz)
  }, [])

  const getProductsByIds = (productIds) => {
    const ids = Array.isArray(productIds) ? productIds : []
    return products.filter((product) => ids.includes(product.id))
  }

  const getCount = (collection) => {
    return getProductsByIds(collection.productIds).length
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

        {/* Featured Collections (distinct style) */}
        <section className="mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-6 text-balance text-center">Featured Algerian Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {items.filter((c) => c.featured).map((c) => (
              <Card key={c.id} className="group overflow-hidden border-border/60 hover:shadow-lg transition-all cursor-pointer" onClick={() => router.push(`/collections/${c.id}`)}>
                <CardContent className="p-0">
                  <div className="aspect-[21/9] overflow-hidden">
                    <img src={c.image || "/placeholder.svg"} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-semibold text-foreground">{c.name}</h3>
                      <Badge variant="secondary">{getCount(c)} items</Badge>
                    </div>
                    <p className="text-muted-foreground text-pretty line-clamp-2">{c.description}</p>
                    <Button variant="ghost" className="mt-3 p-0 h-auto text-primary">Explore <ArrowRight className="h-4 w-4 ml-2 inline" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Collections (list style different from brands) */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((c) => (
              <Card key={c.id} className="group hover:shadow-md transition-all cursor-pointer" onClick={() => router.push(`/collections/${c.id}`)}>
                <CardContent className="p-0">
                  <div className="flex gap-5 p-5 items-start">
                    <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={c.image || "/placeholder.svg"} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
                        <Badge variant="secondary">{getCount(c)} items</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{c.description}</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">View <ArrowRight className="h-3 w-3 ml-1 inline" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
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
