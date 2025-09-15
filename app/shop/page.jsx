"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import ProductGrid from "../../components/ProductGrid"
import { AuthProvider } from "../../contexts/AuthContext"

function ShopContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("elixirdz-cart")
    const savedFavorites = localStorage.getItem("elixirdz-favorites")

    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("elixirdz-cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("elixirdz-favorites", JSON.stringify(favorites))
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favoritesCount}
        onCartOpen={() => setIsCartOpen(true)}
        onFavoritesOpen={() => setIsFavoritesOpen(true)}
      />

      <main>
        <ProductGrid 
          onAddToCart={addToCart} 
          onToggleFavorite={toggleFavorite} 
          favorites={favorites} 
          isHomePage={false}
          initialSearchTerm={searchParams.get('search') || ''}
        />
      </main>

      <Footer />
    </div>
  )
}

export default function ShopPage() {
  return (
    <AuthProvider>
      <ShopContent />
    </AuthProvider>
  )
}
