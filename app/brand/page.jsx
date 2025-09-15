"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../../components/ui/card"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { brands as localBrands } from "../../data/brands"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { useRouter } from "next/navigation"

function BrandContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [brands, setBrands] = useState([])
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterWilaya, setFilterWilaya] = useState("")
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem("elixirdz-cart")
    const savedFavorites = localStorage.getItem("elixirdz-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  useEffect(() => {
    // Static mode: just use local brands
    setBrands(localBrands)
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const filtered = brands
    .filter((b) => (search ? b.name?.toLowerCase().includes(search.toLowerCase()) : true))
    .filter((b) => (filterCategory ? (b.categories || []).includes(filterCategory) : true))
    .filter((b) => (filterWilaya ? (b.wilaya || "").toLowerCase() === filterWilaya.toLowerCase() : true))

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onCartOpen={() => {}}
        onFavoritesOpen={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Algerian Beauty Brands</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover and shop from local Algerian brands across skincare, makeup, haircare, and more.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-10">
          <Input
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border-border max-w-2xl w-full h-12 text-base rounded-lg"
          />
          <div className="flex gap-4 flex-wrap justify-center">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-card border border-border rounded-lg px-4 py-3 text-base"
            >
              <option value="">All Categories</option>
              <option value="makeup">Makeup</option>
              <option value="skincare">Skincare</option>
              <option value="hair">Hair</option>
              <option value="tools">Tools</option>
            </select>
            <select
              value={filterWilaya}
              onChange={(e) => setFilterWilaya(e.target.value)}
              className="bg-card border border-border rounded-lg px-4 py-3 text-base"
            >
              <option value="">All Wilayas</option>
              <option value="algiers">Algiers</option>
              <option value="oran">Oran</option>
              <option value="constantine">Constantine</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((brand) => (
            <Card
              key={brand.id}
              className="group hover:shadow-lg transition-all cursor-pointer"
              onClick={() => router.push(`/brands/${brand.id}`)}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-xl overflow-hidden bg-secondary/30 flex items-center justify-center">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{brand.name}</h3>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      {brand.featured && (
                        <Badge className="text-xs" variant="default">Featured</Badge>
                      )}
                      {brand.wilaya && (
                        <Badge className="text-xs" variant="secondary">{brand.wilaya}</Badge>
                      )}
                      {/* Product counts hidden in static mode */}
                    </div>
                  </div>
                </div>
                <p className="text-base text-muted-foreground mt-5 text-pretty line-clamp-2">
                  {brand.description}
                </p>
                <div className="mt-4 flex gap-3">
                  {brand.website && (
                    <a href={brand.website} target="_blank" rel="noreferrer" className="text-primary text-sm underline">
                      Website
                    </a>
                  )}
                  {brand.instagram && (
                    <a href={brand.instagram} target="_blank" rel="noreferrer" className="text-primary text-sm underline">
                      Instagram
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function BrandPage() {
  return <BrandContent />
}
