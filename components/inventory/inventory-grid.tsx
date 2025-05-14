"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock inventory data
const mockInventoryItems = [
  {
    id: "item1",
    title: "Vintage Polaroid Camera",
    description: "Original Polaroid SX-70 from the 1970s in excellent working condition.",
    image: "/images/vintage-camera.jpeg",
    category: "Electronics",
    condition: "Good",
    estimatedValue: 150,
    dateAdded: "2023-05-15",
    listed: true,
  },
  {
    id: "item2",
    title: "Mechanical Keyboard",
    description: "Custom mechanical keyboard with Cherry MX Blue switches and PBT keycaps.",
    image: "/images/mechanical-keyboard.jpeg",
    category: "Electronics",
    condition: "Excellent",
    estimatedValue: 200,
    dateAdded: "2023-06-02",
    listed: false,
  },
  {
    id: "item3",
    title: "DJI Mini 2 Drone",
    description: "Lightweight drone with 4K camera, barely used, comes with extra batteries.",
    image: "/images/drone.webp",
    category: "Electronics",
    condition: "Like New",
    estimatedValue: 350,
    dateAdded: "2023-06-10",
    listed: true,
  },
  {
    id: "item4",
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket, size M, genuine leather with minimal wear.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    condition: "Good",
    estimatedValue: 120,
    dateAdded: "2023-05-20",
    listed: false,
  },
  {
    id: "item5",
    title: "Mountain Bike",
    description: "Trek Fuel EX 8 mountain bike, size large, recently tuned up.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Sports",
    condition: "Good",
    estimatedValue: 800,
    dateAdded: "2023-04-15",
    listed: true,
  },
  {
    id: "item6",
    title: "Antique Pocket Watch",
    description: "Gold-plated pocket watch from the early 1900s, still keeps accurate time.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Collectibles",
    condition: "Fair",
    estimatedValue: 250,
    dateAdded: "2023-06-05",
    listed: false,
  },
  {
    id: "item7",
    title: "Acoustic Guitar",
    description: "Martin D-15M acoustic guitar with solid mahogany construction.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Musical Instruments",
    condition: "Excellent",
    estimatedValue: 1200,
    dateAdded: "2023-05-28",
    listed: true,
  },
  {
    id: "item8",
    title: "Vintage Comic Book Collection",
    description: "Collection of 20 Marvel comics from the 1980s in protective sleeves.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Collectibles",
    condition: "Good",
    estimatedValue: 300,
    dateAdded: "2023-06-12",
    listed: false,
  },
]

export function InventoryGrid() {
  const router = useRouter()
  const [items] = useState(mockInventoryItems)
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="group"
          whileHover={{
            scale: 1.03,
            rotateY: 5,
            z: 10,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <Link href={`/inventory/${item.id}`}>
            <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-sm hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.listed && (
                  <div className="absolute left-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                    Listed
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{item.title}</h3>
                  <Badge variant="outline">{item.condition}</Badge>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.listed ? "default" : "outline"} className="capitalize">
                      {item.listed ? "Active" : "Draft"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.dateAdded}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
