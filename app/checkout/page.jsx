"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { useAuth } from "../../contexts/AuthContext"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")

  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const { user, addOrder } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem("elixirdz-cart")
    const savedFavorites = localStorage.getItem("elixirdz-favorites")

    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartItems(cart)
      if (cart.length === 0) {
        router.push("/")
      }
    } else {
      router.push("/")
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    // Pre-fill user info if logged in
    if (user) {
      setShippingForm((prev) => ({
        ...prev,
        firstName: user.name.split(" ")[0] || "",
        lastName: user.name.split(" ").slice(1).join(" ") || "",
        email: user.email,
      }))
    }
  }, [user, router])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleShippingChange = (field, value) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field, value) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = `AUR-${Date.now()}`
      setOrderId(newOrderId)

      // Add order to user account if logged in
      if (user) {
        const order = {
          id: newOrderId,
          date: new Date().toLocaleDateString(),
          items: cartItems,
          total: total.toFixed(2),
          status: "Processing",
          shipping: shippingForm,
        }
        addOrder(order)
      }

      // Clear cart
      localStorage.setItem("elixirdz-cart", JSON.stringify([]))
      setCartItems([])

      setIsProcessing(false)
      setOrderComplete(true)
    }, 3000)
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={0} favoritesCount={favorites.length} onCartOpen={() => {}} onFavoritesOpen={() => {}} />

        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">Thank you for your purchase</p>
            </div>

            <Card className="text-left">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number:</span>
                  <span className="font-semibold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-semibold text-primary">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span className="font-semibold">3-5 business days</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push("/")} variant="outline">
                Continue Shopping
              </Button>
              {user && <Button onClick={() => router.push("/account")}>View Orders</Button>}
            </div>
          </div>
        </main>

        <Footer />
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Button>
          <h1 className="text-3xl font-serif font-bold text-foreground">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping & Payment Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input
                        value={shippingForm.firstName}
                        onChange={(e) => handleShippingChange("firstName", e.target.value)}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input
                        value={shippingForm.lastName}
                        onChange={(e) => handleShippingChange("lastName", e.target.value)}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => handleShippingChange("email", e.target.value)}
                      required
                      className="bg-card border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      value={shippingForm.address}
                      onChange={(e) => handleShippingChange("address", e.target.value)}
                      required
                      className="bg-card border-border"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input
                        value={shippingForm.city}
                        onChange={(e) => handleShippingChange("city", e.target.value)}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State</label>
                      <Input
                        value={shippingForm.state}
                        onChange={(e) => handleShippingChange("state", e.target.value)}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ZIP Code</label>
                      <Input
                        value={shippingForm.zipCode}
                        onChange={(e) => handleShippingChange("zipCode", e.target.value)}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Card Number</label>
                    <Input
                      value={paymentForm.cardNumber}
                      onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="bg-card border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name on Card</label>
                    <Input
                      value={paymentForm.nameOnCard}
                      onChange={(e) => handlePaymentChange("nameOnCard", e.target.value)}
                      required
                      className="bg-card border-border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiry Date</label>
                      <Input
                        value={paymentForm.expiryDate}
                        onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                        placeholder="MM/YY"
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CVV</label>
                      <Input
                        value={paymentForm.cvv}
                        onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                        placeholder="123"
                        required
                        className="bg-card border-border"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Qty: {item.quantity}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : `Pay $${total.toFixed(2)}`}
                  </Button>

                  {/* Security Features */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
