"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Edit,
  ArrowLeftRight,
  Trash2,
  Star,
  Calendar,
  Tag,
  MapPin,
  UserIcon,
  MessageSquare,
  Bookmark,
  Bell,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function InventoryItemPage() {
  const router = useRouter()
  const params = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [isSaved, setIsSaved] = useState(false)
  const [isAlertEnabled, setIsAlertEnabled] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate with mock data
    const mockItems = [
      {
        id: 1,
        title: "Vintage Camera",
        description:
          "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors. This camera features manual focus, adjustable aperture, and a classic design that has stood the test of time. The camera comes with its original leather case and strap, both in excellent condition. The lens is clear with no scratches or fungus, and all mechanical parts are functioning properly.",
        category: "Electronics",
        condition: "Good",
        estimatedValue: 120,
        image: "/placeholder.svg?height=500&width=500",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Side+View",
          "/placeholder.svg?height=500&width=500&text=Back+View",
        ],
        status: "available",
        rating: 4.5,
        dateAdded: "2023-11-15",
        details: {
          brand: "Canon",
          model: "AE-1",
          year: "1976",
          features: ["Manual focus", "35mm film", "Built-in light meter"],
        },
        location: {
          city: "Brooklyn",
          state: "NY",
          distance: "2.3 miles away",
        },
        seller: {
          name: "Alex Johnson",
          rating: 4.8,
          trades: 32,
          joinedDate: "2022-03-15",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 2,
        title: "Mechanical Keyboard",
        description:
          "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience. This keyboard features a full ANSI layout with dedicated media controls and a volume knob. The RGB lighting is fully customizable with software, allowing for per-key lighting effects. The keyboard has a detachable USB-C cable for easy transport and replacement.",
        category: "Electronics",
        condition: "Like New",
        estimatedValue: 150,
        image: "/placeholder.svg?height=500&width=500",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Side+View",
          "/placeholder.svg?height=500&width=500&text=With+RGB+on",
        ],
        status: "available",
        rating: 4.8,
        dateAdded: "2023-12-01",
        details: {
          brand: "Ducky",
          model: "One 2 RGB",
          switches: "Cherry MX Brown",
          features: ["RGB lighting", "PBT keycaps", "USB-C connection"],
        },
        location: {
          city: "Manhattan",
          state: "NY",
          distance: "0.8 miles away",
        },
        seller: {
          name: "Sam Taylor",
          rating: 4.9,
          trades: 45,
          joinedDate: "2021-09-07",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 3,
        title: "Drone",
        description:
          "Compact drone with 4K camera and 30 minutes of flight time. Includes extra batteries and carrying case. This drone features GPS positioning, return-to-home functionality, and obstacle avoidance sensors. The camera is mounted on a 3-axis gimbal for smooth, stable footage. The drone can be controlled via smartphone app or the included remote controller.",
        category: "Electronics",
        condition: "Like New",
        estimatedValue: 300,
        image: "/placeholder.svg?height=500&width=500",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=With+Controller",
          "/placeholder.svg?height=500&width=500&text=Camera+Detail",
        ],
        status: "trading",
        rating: 4.7,
        dateAdded: "2023-10-20",
        details: {
          brand: "DJI",
          model: "Mini 2",
          flightTime: "30 minutes",
          features: ["4K camera", "GPS", "Foldable design"],
        },
        location: {
          city: "Queens",
          state: "NY",
          distance: "4.6 miles away",
        },
        seller: {
          name: "Jamie Wilson",
          rating: 4.6,
          trades: 19,
          joinedDate: "2022-08-22",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 4,
        title: "Leather Jacket",
        description:
          "Genuine leather jacket in classic style. Size M, barely worn, excellent condition. This jacket features a timeless design with a zip front, snap collar, and multiple pockets. The leather is soft and supple, with a slight patina that adds character. The jacket is fully lined with a quilted interior for warmth and comfort.",
        category: "Clothing",
        condition: "Excellent",
        estimatedValue: 200,
        image: "/placeholder.svg?height=500&width=500",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Back+View",
          "/placeholder.svg?height=500&width=500&text=Detail+Shot",
        ],
        status: "archived",
        rating: 4.2,
        dateAdded: "2023-09-05",
        details: {
          brand: "Wilson's Leather",
          size: "Medium",
          material: "Genuine leather",
          features: ["Zip front", "Quilted lining", "Multiple pockets"],
        },
        location: {
          city: "Brooklyn",
          state: "NY",
          distance: "1.2 miles away",
        },
        seller: {
          name: "Morgan Lee",
          rating: 4.5,
          trades: 27,
          joinedDate: "2022-05-18",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 5,
        title: "Mountain Bike",
        description:
          "Aluminum frame mountain bike with 21 speeds. Recently tuned up and ready to ride. This bike features hydraulic disc brakes for reliable stopping power in all conditions. The suspension fork helps absorb bumps and rough terrain. The bike has been professionally serviced with new brake pads, a fresh chain, and tuned shifting.",
        category: "Sports",
        condition: "Good",
        estimatedValue: 350,
        image: "/placeholder.svg?height=500&width=500",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Side+View",
          "/placeholder.svg?height=500&width=500&text=Drivetrain",
        ],
        status: "trading",
        rating: 4.6,
        dateAdded: "2023-11-10",
        details: {
          brand: "Trek",
          model: "Marlin 5",
          size: 'Medium (17.5")',
          features: ["Hydraulic disc brakes", "Suspension fork", "21-speed Shimano drivetrain"],
        },
        location: {
          city: "Bronx",
          state: "NY",
          distance: "6.1 miles away",
        },
        seller: {
          name: "Taylor Kim",
          rating: 4.7,
          trades: 15,
          joinedDate: "2023-01-09",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
    ]

    setTimeout(() => {
      const foundItem = mockItems.find((i) => i.id.toString() === params.id)
      setItem(foundItem || null)
      setLoading(false)
    }, 500) // Simulate loading
  }, [params.id])

  const handleEdit = () => {
    router.push(`/inventory/edit/${params.id}`)
  }

  const handleDelete = () => {
    router.push(`/inventory/delete/${params.id}`)
  }

  const handleTrade = () => {
    router.push(`/inventory/trade/${params.id}`)
  }

  const handleBack = () => {
    router.push("/inventory")
  }

  const toggleSaved = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Item removed from saved items" : "Item saved to your collection",
      description: isSaved
        ? "You will no longer see this in your saved items"
        : "You can find this in your saved items",
      duration: 3000,
    })
  }

  const toggleAlert = () => {
    setIsAlertEnabled(!isAlertEnabled)
    toast({
      title: isAlertEnabled ? "Alerts disabled" : "Alerts enabled",
      description: isAlertEnabled
        ? "You will no longer receive alerts for similar items"
        : "You'll be notified when similar items become available",
      duration: 3000,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                  <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                    <span className="font-bold">NT</span>
                  </div>
                </div>
                <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
              </Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
          <div className="flex animate-pulse flex-col items-center justify-center py-20">
            <div className="h-8 w-48 rounded-md bg-muted"></div>
            <div className="mt-4 h-4 w-64 rounded-md bg-muted"></div>
            <div className="mt-8 h-64 w-full max-w-md rounded-lg bg-muted"></div>
          </div>
        </main>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                  <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                    <span className="font-bold">NT</span>
                  </div>
                </div>
                <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
              </Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="mb-4 text-2xl font-bold">Item Not Found</h1>
            <p className="mb-8 text-muted-foreground">The item you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Inventory
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                  <span className="font-bold">NT</span>
                </div>
              </div>
              <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleBack} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="font-heading text-2xl font-bold md:text-3xl">{item.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSaved}>
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current text-primary" : ""}`} />
              <span className="sr-only">{isSaved ? "Unsave item" : "Save item"}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleAlert}>
              <Bell className={`h-5 w-5 ${isAlertEnabled ? "fill-current text-primary" : ""}`} />
              <span className="sr-only">{isAlertEnabled ? "Disable alerts" : "Get alerts"}</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-contain p-4" />
            </div>

            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {item.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer overflow-hidden rounded-md border border-border/40 bg-background/40 dark:border-border/20 dark:bg-[#1a1a1a]/40"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${item.title} view ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="seller">Seller</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-muted/50">
                      {item.condition}
                    </Badge>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold">~${item.estimatedValue}</div>
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Added on {new Date(item.dateAdded).toLocaleDateString()}</span>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 font-medium">Description</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>

                <Card className="mb-6 border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4">
                    <h3 className="mb-4 font-medium">Details</h3>
                    <div className="grid gap-2">
                      {Object.entries(item.details).map(([key, value]) => (
                        <div key={key} className="flex items-start">
                          <Tag className="mr-2 h-4 w-4 text-[#00D084]" />
                          <div>
                            <span className="font-medium capitalize">{key}: </span>
                            {Array.isArray(value) ? (
                              <ul className="ml-2 list-inside list-disc">
                                {value.map((item, index) => (
                                  <li key={index} className="text-muted-foreground">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-muted-foreground">{value}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seller">
                <Card className="mb-6 border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={item.seller.avatar || "/placeholder.svg"}
                            alt={item.seller.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.seller.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            <span>
                              {item.seller.rating} • {item.seller.trades} trades
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Member since {new Date(item.seller.joinedDate).toLocaleDateString()}</p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-border/40 bg-muted/20 p-3 text-center dark:border-border/20">
                        <div className="text-xl font-bold text-[#00D084]">{item.seller.trades}</div>
                        <div className="text-xs text-muted-foreground">Trades</div>
                      </div>
                      <div className="rounded-lg border border-border/40 bg-muted/20 p-3 text-center dark:border-border/20">
                        <div className="text-xl font-bold text-amber-500">{item.seller.rating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location">
                <Card className="mb-6 border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-[#00D084]" />
                      <div>
                        <h3 className="font-medium">
                          {item.location.city}, {item.location.state}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.location.distance}</p>
                      </div>
                    </div>

                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted mb-3">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <MapPin className="mx-auto h-8 w-8 mb-2 opacity-40" />
                          <p className="text-sm">Map view</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <UserIcon className="h-4 w-4" />
                      <p className="text-muted-foreground">
                        Your location and this item's location will be visible when trading
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-4">
              <div className="mb-4 flex items-center gap-2">
                <Switch id="alert-similar" checked={isAlertEnabled} onCheckedChange={toggleAlert} />
                <Label htmlFor="alert-similar">Get alerts when similar items are available</Label>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleEdit} className="flex-1 gap-2 sm:flex-none">
                <Edit className="h-4 w-4" />
                Edit Item
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="flex-1 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive sm:flex-none"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              <Button
                onClick={handleTrade}
                className="flex-1 gap-2 group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)] sm:flex-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  Trade This Item
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
