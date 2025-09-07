"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent } from "./ui/card"
import { products } from "../data/products"
import { useRouter } from "next/navigation"

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered.slice(0, 6)) // Limit to 6 results
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`)
    onClose()
    setSearchQuery("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
                autoFocus
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {searchQuery.trim() === "" ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search products...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No products found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Found {searchResults.length} product{searchResults.length !== 1 ? "s" : ""}
              </p>
              {searchResults.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProductClick(product.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                        <p className="text-lg font-bold text-primary">${product.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
