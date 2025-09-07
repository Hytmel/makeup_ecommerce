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
import { AuthProvider } from "../contexts/AuthContext"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { blogPosts } from "../data/blog"

function HomeContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
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
        <ProductGrid onAddToCart={addToCart} onToggleFavorite={toggleFavorite} favorites={favorites} />

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
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  )
}
