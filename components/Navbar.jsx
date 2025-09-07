"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Search, Menu, X, User } from "lucide-react"
import { Button } from "./ui/button"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import SearchModal from "./SearchModal"

export default function Navbar({ cartCount, favoritesCount, onCartOpen, onFavoritesOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false) // Added search modal state
  const { user } = useAuth()
  const router = useRouter()

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

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>

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

              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

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

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
