"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import ProductGrid from "../components/ProductGrid"
import Reviews from "../components/Reviews"
import About from "../components/About"
import Footer from "../components/Footer"
import Cart from "../components/Cart"
import Favorites from "../components/Favorites"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { blogPosts } from "../data/blog"
import { db } from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { brands as localBrands } from "../data/brands"
import { Badge } from "../components/ui/badge"

function HomeContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [brands, setBrands] = useState([])
  const [productsByBrand, setProductsByBrand] = useState({})
  const router = useRouter()

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("aurelia-cart")
    const savedFavorites = localStorage.getItem("aurelia-favorites")

    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("aurelia-cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("aurelia-favorites", JSON.stringify(favorites))
  }, [favorites])

  // Load brands (featured) from Firestore with fallback to local
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const snap = await getDocs(collection(db, "brands"))
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        if (list.length > 0) {
          setBrands(list.filter((b) => b.featured))
          // compute product counts per brand
          try {
            const prodSnap = await getDocs(collection(db, "products"))
            const map = {}
            prodSnap.forEach((doc) => {
              const b = doc.data()?.brand
              if (b) map[b] = (map[b] || 0) + 1
            })
            setProductsByBrand(map)
          } catch (_) {}
          return
        }
      } catch (_) {}
      setBrands(localBrands.filter((b) => b.featured))
    }
    loadBrands()
  }, [])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      }
      return [...prev, productId]
    })
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const favoritesCount = favorites.length

  const featuredBlogPosts = blogPosts.filter((post) => post.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favoritesCount}
        onCartOpen={() => setIsCartOpen(true)}
        onFavoritesOpen={() => setIsFavoritesOpen(true)}
      />

      <main>
        <Hero />
        <ProductGrid onAddToCart={addToCart} onToggleFavorite={toggleFavorite} favorites={favorites} isCompact />

        {/* Featured Algerian Brands */}
        {brands.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative text-center mb-8">
                <h2 className="text-4xl font-serif font-bold text-foreground mb-0 text-balance">Featured Algerian Brands</h2>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/brand")}
                  className="h-auto absolute right-0 top-1/2 -translate-y-1/2"
                >
                  View all brands
                </Button>
              </div>
              {(() => {
                // Ensure we always show 3 cards by supplementing with local brands if needed
                const existingIds = new Set(brands.map((b) => b.id))
                const supplemented = [...brands]
                for (const lb of localBrands) {
                  if (supplemented.length >= 3) break
                  if (!existingIds.has(lb.id)) supplemented.push(lb)
                }
                const displayBrands = supplemented.slice(0, 3)
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {displayBrands.map((b) => (
                      <Card
                        key={b.id}
                        className="group cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => router.push(`/brands/${b.id}`)}
                      >
                        <CardContent className="p-8">
                          <div className="flex items-center gap-4">
                            <div className="h-24 w-24 rounded-xl overflow-hidden bg-secondary/30 flex items-center justify-center">
                              <img src={b.logo || "/placeholder.svg"} alt={b.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xl font-semibold text-foreground line-clamp-2">{b.name}</div>
                              <div className="mt-1 flex items-center gap-2 flex-wrap">
                                {b.featured && <Badge className="text-xs">Featured</Badge>}
                                {b.wilaya && <Badge className="text-xs" variant="secondary">{b.wilaya}</Badge>}
                                {!!(productsByBrand[b.id] || 0) && (
                                  <Badge className="text-xs" variant="outline">{productsByBrand[b.id]} products</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {b.description && (
                            <p className="text-base text-muted-foreground mt-5 text-pretty line-clamp-2">{b.description}</p>
                          )}
                          <div className="mt-4 flex gap-3">
                            {b.website && (
                              <a href={b.website} target="_blank" rel="noreferrer" className="text-primary text-sm underline">
                                Website
                              </a>
                            )}
                            {b.instagram && (
                              <a href={b.instagram} target="_blank" rel="noreferrer" className="text-primary text-sm underline">
                                Instagram
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              })()}
            </div>
          </section>
        )}

        <section className="py-20 bg-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-balance">Beauty Journal</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Discover expert tips, tutorials, and insights from the world of luxury beauty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredBlogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => router.push(`/blog/${post.slug}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="text-sm text-muted-foreground">{post.category}</div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-balance line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{post.excerpt}</p>
                      <div className="text-xs text-muted-foreground">{post.readTime}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button onClick={() => router.push("/blog")} variant="outline" size="lg">
                <BookOpen className="h-5 w-5 mr-2" />
                View All Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <Reviews />
        <About />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />

      <Favorites
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onAddToCart={addToCart}
      />
    </div>
  )
}

export default function Home() {
  return (
    <HomeContent />
  )
}
