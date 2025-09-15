"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Search, Menu, X, User } from "lucide-react"
import { Button } from "./ui/button"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Input } from "./ui/input"

export default function Navbar({ cartCount, favoritesCount, onCartOpen, onFavoritesOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  const submitSearch = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (query.length > 0) {
      router.push(`/shop?search=${encodeURIComponent(query)}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <>
      <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1
                className="text-2xl font-serif font-bold text-foreground cursor-pointer"
                onClick={() => router.push("/")}
              >
                Aurelia
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="/#home"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Home
                </a>
                <a
                  href="/#shop"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Shop
                </a>
                <button
                  onClick={() => router.push("/collections")}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Collections
                </button>
                <button
                  onClick={() => router.push("/brand")}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Brand
                </button>
                <button
                  onClick={() => router.push("/blog")}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Blog
                </button>
                <a
                  href="/#about"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  About
                </a>
                <a
                  href="/#contact"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Right side: search + icons */}
            <div className="flex items-center space-x-4">
              {/* Inline expanding search (desktop and mobile) */}
              {isSearchOpen ? (
                <form onSubmit={submitSearch} className="hidden sm:flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="pl-10 bg-card border-border w-64"
                    />
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
              )}

              <Button variant="ghost" size="icon" className="relative" onClick={onFavoritesOpen}>
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="relative" onClick={onCartOpen}>
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(user ? "/account" : "/login")}
                className="relative"
              >
                <User className="h-5 w-5" />
                {user && <span className="absolute -bottom-1 -right-1 bg-primary rounded-full h-2 w-2"></span>}
              </Button>

              {/* Mobile: search icon toggles a row below header */}
              <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setIsSearchOpen((v) => !v)}>
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile inline search row */}
          {isSearchOpen && (
            <div className="sm:hidden pb-3">
              <form onSubmit={submitSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="pl-10 bg-card border-border"
                  />
                </div>
                <Button type="submit" variant="outline">Search</Button>
              </form>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
                <button
                  onClick={() => {
                    setIsSearchOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  Search Products
                </button>
                <a
                  href="/#home"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  Home
                </a>
                <a
                  href="/#shop"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  Shop
                </a>
                <button
                  onClick={() => router.push("/collections")}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  Collections
                </button>
                <button
                  onClick={() => router.push("/brand")}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  Brand
                </button>
                <button
                  onClick={() => router.push("/blog")}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  Blog
                </button>
                <a
                  href="/#about"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  About
                </a>
                <a
                  href="/#contact"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  Contact
                </a>
                <button
                  onClick={() => router.push(user ? "/account" : "/login")}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  {user ? "My Account" : "Sign In"}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
