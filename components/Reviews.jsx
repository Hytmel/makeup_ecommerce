"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely love the Glow Foundation! It gives me the perfect natural radiance without feeling heavy.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Emily Chen",
    rating: 5,
    comment: "The Luxury Lipstick is incredible. The color payoff is amazing and it lasts all day.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    rating: 4,
    comment: "Beautiful packaging and high-quality products. The eyeshadow palette has become my go-to.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Jessica Williams",
    rating: 5,
    comment: "Finally found a brand that understands luxury makeup. Every product feels premium.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "Anna Thompson",
    rating: 5,
    comment: "The skincare line is phenomenal. My skin has never looked better since I started using Aurelia.",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-balance">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied customers who trust Aurelia for their beauty needs
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-background border-border shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={reviews[currentIndex].image || "/placeholder.svg"}
                  alt={reviews[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {renderStars(reviews[currentIndex].rating)}
                  </div>

                  <blockquote className="text-lg text-foreground mb-4 italic text-pretty">
                    "{reviews[currentIndex].comment}"
                  </blockquote>

                  <cite className="text-primary font-semibold">{reviews[currentIndex].name}</cite>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="border-border hover:bg-card bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="border-border hover:bg-card bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
