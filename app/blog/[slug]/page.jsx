"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Clock, User, Share2, Heart } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Separator } from "../../../components/ui/separator"
import { blogPosts } from "../../../data/blog"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { AuthProvider } from "../../../contexts/AuthContext"

function BlogPostContent() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === params.slug)
    setPost(foundPost)

    const savedCart = localStorage.getItem("aurelia-cart")
    const savedFavorites = localStorage.getItem("aurelia-favorites")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [params.slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Article not found</h2>
          <Button onClick={() => router.push("/blog")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3)

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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => router.push("/")} className="hover:text-primary transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => router.push("/blog")} className="hover:text-primary transition-colors">
            Blog
          </button>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="space-y-4 mb-6">
            <Badge variant="secondary">{post.category}</Badge>
            <h1 className="text-4xl font-serif font-bold text-foreground text-balance">{post.title}</h1>
            <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="mb-12">
          <Separator className="mb-6" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-balance line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
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

export default function BlogPostPage() {
  return (
    <AuthProvider>
      <BlogPostContent />
    </AuthProvider>
  )
}
