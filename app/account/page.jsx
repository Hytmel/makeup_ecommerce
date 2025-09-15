"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Package, Heart, Settings, LogOut, Edit2, Save, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useAuth } from "../../contexts/AuthContext"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function AccountPage() {
  const { user, logout, updateProfile, isLoading } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "" })
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    if (user) {
      setEditForm({ name: user.displayName || "", email: user.email || "" })
    }

    // Load cart and favorites
    const savedCart = localStorage.getItem("aurelia-cart")
    const savedFavorites = localStorage.getItem("aurelia-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [user, isLoading, router])

  const handleSaveProfile = () => {
    // Persist only displayName via Firebase Auth
    updateProfile({ displayName: editForm.name })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your profile and view your orders</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    {isEditing ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="bg-card border-border"
                      />
                    ) : (
                      <p className="text-muted-foreground">{user.displayName || user.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    {isEditing ? (
                      <Input
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="bg-card border-border"
                      />
                    ) : (
                      <p className="text-muted-foreground">{user.email}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Member Since</label>
                  <p className="text-muted-foreground">
                    {new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {user.orders && user.orders.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.map((order, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <p className="font-semibold text-primary">${order.total}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item(s) • {order.status}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={() => router.push("/#shop")}>
                      Start Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Products</CardTitle>
              </CardHeader>
              <CardContent>
                {favorites.length > 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">You have {favorites.length} favorite product(s)</p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={() => router.push("/#shop")}>
                      View Products
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No favorite products yet</p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={() => router.push("/#shop")}>
                      Discover Products
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium text-foreground">Sign Out</h3>
                    <p className="text-sm text-muted-foreground">Sign out of your account</p>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
