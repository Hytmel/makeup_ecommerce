"use client"

import { X, Heart, ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { products } from "../data/products"

export default function Favorites({ isOpen, onClose, favorites, onToggleFavorite, onAddToCart }) {
  const favoriteProducts = products.filter((product) => favorites.includes(product.id))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        <Card className="h-full flex flex-col border-0 rounded-none">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorites ({favoriteProducts.length})
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-0">
            {favoriteProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">Save products you love to find them easily later</p>
                <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {favoriteProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border border-border rounded-lg bg-card">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">{product.name}</h4>
                      <p className="text-primary font-bold">${product.price}</p>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => onAddToCart(product)}
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onToggleFavorite(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Heart className="h-3 w-3 mr-1 fill-current" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
