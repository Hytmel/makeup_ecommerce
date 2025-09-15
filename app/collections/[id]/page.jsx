"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { collectionsDz } from "../../../data/collections_dz"
import { products } from "../../../data/products"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

function CollectionDetailsContent() {
  const params = useParams()
  const router = useRouter()
  const [collection, setCollection] = useState(null)
  const [collectionProducts, setCollectionProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const foundCollection = collectionsDz.find((c) => c.id === params.id)
    setCollection(foundCollection)

    if (foundCollection) {
      const ids = Array.isArray(foundCollection.productIds) ? foundCollection.productIds : []
      const collectionProductList = products.filter((product) => ids.includes(product.id))
      setCollectionProducts(collectionProductList)
    }

    const savedCart = localStorage.getItem("elixirdz-cart")
    const savedFavorites = localStorage.getItem("elixirdz-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [params.id])

  useEffect(() => {
    localStorage.setItem("elixirdz-cart", JSON.stringify(cartItems))
  }, [cartItems])

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
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Collection not found</h2>
          <Button onClick={() => router.push("/collections")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Button>
        </div>
      </div>
    )
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => router.push("/")} className="hover:text-primary transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => router.push("/collections")} className="hover:text-primary transition-colors">
            Collections
          </button>
          <span>/</span>
          <span className="text-foreground">{collection.name}</span>
        </div>

        {/* Collection Header */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                {collection.featured && <Badge className="mb-4">Featured Collection</Badge>}
                <h1 className="text-4xl font-serif font-bold text-foreground mb-4 text-balance">{collection.name}</h1>
                <p className="text-xl text-muted-foreground text-pretty">{collection.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{collectionProducts.length} Products</Badge>
                <span className="text-sm text-muted-foreground">
                  Starting from ${Math.min(...collectionProducts.map((p) => p.price))}
                </span>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Products in this Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collectionProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-background/90 hover:bg-background text-foreground shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-primary text-primary" : ""}`}
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-background/90 hover:bg-background text-foreground shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors text-balance">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground text-pretty">{product.description}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-sm text-muted-foreground ml-2">({product.rating}.0)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Collections */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Explore More Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collectionsDz
              .filter((c) => c.id !== collection.id && c.featured)
              .slice(0, 3)
              .map((relatedCollection) => (
                <Card
                  key={relatedCollection.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg"
                  onClick={() => router.push(`/collections/${relatedCollection.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={relatedCollection.image || "/placeholder.svg"}
                        alt={relatedCollection.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {relatedCollection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground text-pretty">{relatedCollection.description}</p>
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

export default function CollectionDetailsPage() {
  return <CollectionDetailsContent />
}
