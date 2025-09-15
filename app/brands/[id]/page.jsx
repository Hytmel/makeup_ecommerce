"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { brands as localBrands } from "../../../data/brands"
import { products as localProducts } from "../../../data/products"

export default function BrandDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const brandId = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [brand, setBrand] = useState(null)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedCart = localStorage.getItem("aurelia-cart")
    const savedFavorites = localStorage.getItem("aurelia-favorites")
    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  useEffect(() => {
    if (!brandId) return
    // Static mode: use local brand list and sample products
    const lb = localBrands.find((b) => b.id === brandId)
    setBrand(lb || null)
    // Local products don't have brand association; show a few as placeholders
    setProducts((localProducts || []).slice(0, 6))
    setLoading(false)
  }, [brandId])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading brand…</div>
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="text-foreground font-medium">Brand not found</div>
          <Button variant="outline" onClick={() => router.push("/brand")}>Back to Brands</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onCartOpen={() => {}}
        onFavoritesOpen={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-xl overflow-hidden bg-secondary/30 flex items-center justify-center">
            <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold text-foreground">{brand.name}</h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {brand.featured && <Badge>Featured</Badge>}
              {brand.wilaya && <Badge variant="secondary">{brand.wilaya}</Badge>}
              {(brand.categories || []).map((c) => (
                <Badge key={c} variant="outline">{c}</Badge>
              ))}
            </div>
            {brand.description && (
              <p className="text-muted-foreground mt-3 max-w-2xl text-pretty">{brand.description}</p>
            )}
            <div className="mt-3 flex gap-4">
              {brand.website && (
                <a href={brand.website} target="_blank" rel="noreferrer" className="text-primary underline text-sm">
                  Website
                </a>
              )}
              {brand.instagram && (
                <a href={brand.instagram} target="_blank" rel="noreferrer" className="text-primary underline text-sm">
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Products */}
        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Products</h2>
        {products.length === 0 ? (
          <div className="text-muted-foreground">No products for this brand yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <Card key={p.id} className="group hover:shadow-md transition-all cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                    <img src={p.image || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="text-sm text-muted-foreground">{brand.name}</div>
                    <div className="font-medium text-foreground">{p.name}</div>
                    {typeof p.priceDzd === "number" && (
                      <div className="text-primary font-semibold">{new Intl.NumberFormat("fr-DZ", { style: "currency", currency: "DZD" }).format(p.priceDzd)}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
