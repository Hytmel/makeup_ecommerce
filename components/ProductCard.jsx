"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { useRouter } from "next/navigation"

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  const handleCardClick = () => {
    router.push(`/product/${product.id}`)
  }

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay Actions */}
          <div
            className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="icon"
              variant="secondary"
              className="bg-background/90 hover:bg-background text-foreground shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(product.id)
              }}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-background/90 hover:bg-background text-foreground shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(product)
              }}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 text-balance">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground text-pretty">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
            <span className="text-sm text-muted-foreground ml-2">({product.rating}.0)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(product)
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
