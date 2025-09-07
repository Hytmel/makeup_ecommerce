"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, User, ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { blogPosts, categories } from "../../data/blog"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { AuthProvider } from "../../contexts/AuthContext"

function BlogContent() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem("aurelia-cart")
    const savedFavorites = localStorage.getItem("aurelia-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category.toLowerCase().replace(" ", "-") === selectedCategory)

  const featuredPosts = blogPosts.filter((post) => post.featured)
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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4 text-balance">Beauty Journal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Expert tips, tutorials, and insights from the world of luxury beauty
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post) => (
              <Card
                key={post.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[16/10] overflow-hidden rounded-t-lg">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors text-balance">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-pretty">{post.excerpt}</p>
                    </div>
                    <Button variant="ghost" className="group-hover:text-primary p-0 h-auto font-medium">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:bg-card"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
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
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    {post.featured && <Badge className="text-xs">Featured</Badge>}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-balance line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function BlogPage() {
  return (
    <AuthProvider>
      <BlogContent />
    </AuthProvider>
  )
}
