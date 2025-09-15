"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart, ShoppingBag, Star, Minus, Plus, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Separator } from "../../../components/ui/separator"
import { products } from "../../../data/products"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { AuthProvider } from "../../../contexts/AuthContext"

function ProductDetailsContent() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  // Load product and localStorage data
  useEffect(() => {
    const productId = Number.parseInt(params.id)
    const foundProduct = products.find((p) => p.id === productId)
    setProduct(foundProduct)

    const savedCart = localStorage.getItem("elixirdz-cart")
    const savedFavorites = localStorage.getItem("elixirdz-favorites")

    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [params.id])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("elixirdz-cart", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem("elixirdz-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToCart = (productToAdd, qty = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productToAdd.id)
      if (existingItem) {
        return prev.map((item) => (item.id === productToAdd.id ? { ...item, quantity: item.quantity + qty } : item))
      }
      return [...prev, { ...productToAdd, quantity: qty }]
    })
  }

  const buyNow = () => {
    addToCart(product, quantity)
    // Small delay to ensure cart is updated before navigation
    setTimeout(() => {
      router.push("/checkout")
    }, 100)
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      }
      return [...prev, productId]
    })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Product not found</h2>
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const isFavorite = favorites.includes(product.id)

  // Mock additional images for gallery
  const productImages = [
    product.image,
    "/placeholder-5v0ld.png",
    "/placeholder-meeea.png",
    "/makeup-product-packaging-details.jpg",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onCartOpen={() => setIsCartOpen(true)}
        onFavoritesOpen={() => setIsFavoritesOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => router.push("/")} className="hover:text-primary transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-card">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-4 text-balance">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-sm text-muted-foreground">({product.rating}.0) • 127 reviews</span>
              </div>
              <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>
            </div>

            <div className="text-4xl font-bold text-primary">${product.price}</div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => addToCart(product, quantity)}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1 bg-transparent" onClick={buyNow}>
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => toggleFavorite(product.id)}
                  className={isFavorite ? "border-primary text-primary" : ""}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary" : ""}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Authentic luxury products guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>
                    Experience luxury with our {product.name}. This premium {product.category} product is crafted with
                    the finest ingredients and cutting-edge formulation technology to deliver exceptional results.
                  </p>
                  <p>
                    Perfect for daily use, this product combines elegance with performance, ensuring you look and feel
                    your absolute best. The sophisticated formula provides long-lasting wear while nourishing your skin.
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>1. Prepare your skin with our recommended primer for best results</p>
                  <p>2. Apply the product using gentle, even strokes</p>
                  <p>3. Build coverage gradually for your desired intensity</p>
                  <p>4. Set with our luxury setting spray for all-day wear</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <p className="text-muted-foreground text-sm">
                  Premium ingredients carefully selected for quality and performance. Cruelty-free and formulated
                  without parabens, sulfates, or harmful chemicals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  onClick={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1">{renderStars(relatedProduct.rating)}</div>
                      <p className="text-lg font-bold text-primary">${relatedProduct.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function ProductDetails() {
  return (
    <AuthProvider>
      <ProductDetailsContent />
    </AuthProvider>
  )
}
