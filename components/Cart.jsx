"use client"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useRouter } from "next/navigation"

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const router = useRouter()
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    onClose()
    router.push("/checkout")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        <Card className="h-full flex flex-col border-0 rounded-none">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Shopping Cart ({cartItems.length})
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-0">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some beautiful products to get started</p>
                <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg bg-card">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">{item.name}</h4>
                      <p className="text-primary font-bold">${item.price}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {cartItems.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
