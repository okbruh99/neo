"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  ArrowLeftRight,
  Star,
  MapPin,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Share2,
  Navigation,
  Tag,
  MessageSquare,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-provider"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { EnhancedMapView } from "@/components/map/enhanced-map-view"
import Link from "next/link"

export default function MapItemPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [userLocation, setUserLocation] = useState(null)

  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          const mockItem = {
            id: params.id,
            title: "Vintage Film Camera",
            description:
              "A beautifully preserved vintage film camera from the 1970s. This Canon AE-1 is in excellent working condition with minor cosmetic wear. Comes with the original 50mm f/1.8 lens, lens cap, and camera strap. Perfect for photography enthusiasts or collectors.",
            category: "Electronics",
            condition: "Good",
            estimatedValue: 120,
            images: [
              "/placeholder.svg?height=500&width=500&text=Camera+Front",
              "/placeholder.svg?height=500&width=500&text=Camera+Back",
              "/placeholder.svg?height=500&width=500&text=Camera+Side",
              "/placeholder.svg?height=500&width=500&text=Camera+Top",
            ],
            owner: {
              id: "user123",
              name: "John Doe",
              avatar: "/placeholder.svg?height=40&width=40",
              rating: 4.5,
              location: "New York, NY",
              joinedDate: "2022-08-15",
              completedTrades: 35,
            },
            lookingFor: ["Digital Camera", "Lenses", "Photography Books"],
            details: {
              brand: "Canon",
              model: "AE-1",
              year: "1976",
              filmType: "35mm",
              lensMount: "Canon FD",
            },
            dateAdded: "2023-11-15",
            coordinates: { lat: 40.7128, lng: -74.006 }, // New York coordinates
            distance: 3.2, // miles from user
            meetupPreferences: ["Public places only", "Weekends preferred", "Daytime only"],
            safetyTips: [
              "Meet in a well-lit public place.",
              "Bring a friend or family member.",
              "Inspect the item carefully before completing the trade.",
            ],
          }
          setItem(mockItem)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Failed to fetch item:", error)
        setLoading(false)
        toast({
          title: "Error",
          description: "Failed to load item details.",
          variant: "destructive",
        })
      }
    }

    fetchItem()
  }, [params.id, toast])

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Your Location",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  const handleBack = () => {
    router.push("/map")
  }

  const handleContactOwner = () => {
    if (item && item.owner) {
      router.push(`/messages/${item.owner.id}`)
    }
  }

  const handleProposeTrade = () => {
    if (item) {
      router.push(`/marketplace/propose-trade/${item.id}`)
    }
  }

  const handleViewOwnerProfile = () => {
    if (item && item.owner) {
      router.push(`/profile/${item.owner.id}`)
    }
  }

  const handleShareItem = () => {
    // Create the item URL
    const itemUrl = `${window.location.origin}/map/item/${item.id}`

    // Copy to clipboard
    navigator.clipboard.writeText(itemUrl).then(
      () => {
        toast({
          title: "Link copied to clipboard",
          description: "You can now paste and share the item link",
        })
      },
      (err) => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link to clipboard",
          variant: "destructive",
        })
      },
    )
  }

  const getDirections = () => {
    if (item && item.coordinates) {
      // In a real app, this would open Google Maps with directions
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}`,
        "_blank",
      )
    }
  }

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : item.images.length - 1))
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < item.images.length - 1 ? prevIndex + 1 : 0))
  }

  const toggleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Item unsaved" : "Item saved",
      description: isSaved
        ? "This item has been removed from your saved items."
        : "This item has been saved to your profile.",
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
              Back to Map
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
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Button>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">{item.title}</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <Image
                  src={item.images?.[currentImageIndex] || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3 backdrop-blur-sm dark:from-[#121212]/80">
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                    {item.category}
                  </Badge>
                </div>
                {item.images && item.images.length > 1 && (
                  <div className="absolute top-1/2 left-2 -translate-y-1/2">
                    <Button variant="ghost" size="icon" onClick={goToPreviousImage}>
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                  </div>
                )}
                {item.images && item.images.length > 1 && (
                  <div className="absolute top-1/2 right-2 -translate-y-1/2">
                    <Button variant="ghost" size="icon" onClick={goToNextImage}>
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                )}
              </div>

              {item.images && item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                        currentImageIndex === index
                          ? "border-[#00D084] ring-2 ring-[#00D084]/30"
                          : "border-border/40 dark:border-border/20"
                      } bg-background/40 hover:border-primary focus:border-primary focus:outline-none dark:bg-[#1a1a1a]/40`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${item.title} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-4">
                  <h3 className="mb-4 font-medium">Location Details</h3>
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#00D084]" />
                    <span className="font-medium">{item.owner.location}</span>
                    <Badge variant="outline" className="ml-auto">
                      {item.distance} miles away
                    </Badge>
                  </div>

                  <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-md">
                    {/* Mini map view */}
                    <EnhancedMapView initialItems={[item]} initialLocation={item.coordinates} className="h-[200px]" />
                  </div>

                  <Button onClick={getDirections} className="w-full gap-2">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-muted/50">
                  {item.condition}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span>{item.owner.rating}</span>
                </div>
              </div>
              <div className="text-lg font-medium">~${item.estimatedValue}</div>
            </div>

            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Added on {new Date(item.dateAdded).toLocaleDateString()}</span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 font-medium">Description</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>

            <Tabs defaultValue="details" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
                <TabsTrigger value="meetup">Meetup</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4">
                    <h3 className="mb-4 font-medium">Item Details</h3>
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
              <TabsContent value="owner" className="mt-4">
                <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4">
                    <h3 className="mb-4 font-medium">Owner Information</h3>
                    <div className="flex items-center gap-3">
                      <div
                        className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-full hover:ring-2 hover:ring-[#00D084]"
                        onClick={handleViewOwnerProfile}
                      >
                        <Image
                          src={item.owner.avatar || "/placeholder.svg"}
                          alt={item.owner.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4
                          className="cursor-pointer font-medium hover:text-[#00D084]"
                          onClick={handleViewOwnerProfile}
                        >
                          {item.owner.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span>{item.owner.rating} rating</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{item.owner.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="rounded-md bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">Member Since</p>
                        <p className="font-medium">
                          {new Date(item.owner.joinedDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <div className="rounded-md bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">Completed Trades</p>
                        <p className="font-medium">{item.owner.completedTrades}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="meetup" className="mt-4">
                <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4">
                    <h3 className="mb-4 font-medium">Meetup Preferences</h3>
                    <div className="space-y-3">
                      {item.meetupPreferences.map((preference, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00D084]/10">
                            <Clock className="h-3 w-3 text-[#00D084]" />
                          </div>
                          <span className="text-sm">{preference}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mb-6">
              <h3 className="mb-2 font-medium">Looking For</h3>
              <div className="flex flex-wrap gap-2">
                {item.lookingFor.map((item, index) => (
                  <Badge key={index} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleContactOwner} className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Contact Owner
              </Button>
              <Button variant="outline" onClick={handleShareItem} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Item
              </Button>
              <Button
                onClick={handleProposeTrade}
                className="col-span-2 gap-2 group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  Propose Trade
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
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
