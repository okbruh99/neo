"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  MessageSquare,
  Flag,
  Calendar,
  Clock,
  Package,
  ArrowLeftRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react"
import { mockUserProfiles } from "@/mock/user-profiles"
import { mockTradeData } from "@/mock/map-data"
import { ReportUserDialog } from "@/components/report-user-dialog"

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [userItems, setUserItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUser = async () => {
      setLoading(true)
      try {
        // Find user in mock data
        const foundUser = mockUserProfiles.find((u) => u.id.toString() === params.id)

        if (foundUser) {
          setUser(foundUser)

          // Find items from this user
          const userItems = mockTradeData.filter((item) => item.owner && item.owner.id.toString() === params.id)
          setUserItems(userItems)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchUser()
    }
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleContactUser = () => {
    router.push(`/messages/${params.id}`)
  }

  const handleReportUser = () => {
    setReportDialogOpen(true)
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
            <div className="h-24 w-24 rounded-full bg-muted"></div>
            <div className="mt-4 h-8 w-48 rounded-md bg-muted"></div>
            <div className="mt-2 h-4 w-64 rounded-md bg-muted"></div>
            <div className="mt-8 h-64 w-full max-w-3xl rounded-lg bg-muted"></div>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
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
            <h1 className="mb-4 text-2xl font-bold">User Not Found</h1>
            <p className="mb-8 text-muted-foreground">The user you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
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
              <motion.div
                className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 10,
                  }}
                >
                  <span className="font-bold">NT</span>
                </motion.div>
              </motion.div>
              <motion.span
                className="hidden font-heading text-xl font-bold sm:inline-block"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #00D084, #3B82F6, #00D084)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NeoTradez
              </motion.span>
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
            Back
          </Button>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* User Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-start">
              <div className="relative mb-4 h-24 w-24 sm:mb-0 sm:mr-6">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {user.verified && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-[#00D084] p-1 text-white">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex flex-col items-center sm:flex-row sm:items-center">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  {user.verified && (
                    <Badge className="ml-0 mt-2 sm:ml-2 sm:mt-0 bg-[#00D084]/10 text-[#00D084]">Verified</Badge>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {user.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>{user.completedTrades} trades completed</span>
                  </div>
                  {user.instagram && (
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-500"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <a
                        href={`https://instagram.com/${user.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {user.instagram}
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 sm:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(user.rating) ? "fill-amber-400 text-amber-400" : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{user.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2 sm:ml-auto sm:mt-0">
                <Button variant="outline" size="sm" onClick={handleContactUser} className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReportUser}
                  className="gap-1 text-destructive hover:bg-destructive/10"
                >
                  <Flag className="h-4 w-4" />
                  Report
                </Button>
              </div>
            </div>

            {/* User Bio */}
            <Card className="mt-6 border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardContent className="p-4">
                <h2 className="mb-2 font-medium">About</h2>
                <p className="text-muted-foreground">{user.bio}</p>
              </CardContent>
            </Card>

            {/* User Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-4 text-center">
                  <div className="mb-1 flex justify-center text-[#00D084]">
                    <ArrowLeftRight className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{user.completedTrades}</div>
                  <div className="text-xs text-muted-foreground">Trades Completed</div>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-4 text-center">
                  <div className="mb-1 flex justify-center text-amber-500">
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{user.rating.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Average Rating</div>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-4 text-center">
                  <div className="mb-1 flex justify-center text-blue-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{user.responseTime}</div>
                  <div className="text-xs text-muted-foreground">Avg. Response Time</div>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-4 text-center">
                  <div className="mb-1 flex justify-center text-purple-500">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{user.trustScore}%</div>
                  <div className="text-xs text-muted-foreground">Trust Score</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* User Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="items">Items ({userItems.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({user.reviewCount})</TabsTrigger>
                <TabsTrigger value="badges">Badges ({user.badges.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="mt-0">
                {userItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {userItems.map((item) => (
                      <Link href={`/marketplace/${item.id}`} key={item.id}>
                        <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-md transition-all hover:shadow-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                          <div className="relative aspect-square">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium line-clamp-1">{item.title}</h3>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {item.category}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="font-medium">${item.estimatedValue}</span>
                              <span className="text-xs text-muted-foreground">{item.condition}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border/60 dark:border-border/40">
                    <p className="text-muted-foreground">No items listed yet</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                {user.reviews && user.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {user.reviews.map((review, index) => (
                      <Card
                        key={index}
                        className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={review.reviewer.avatar || "/placeholder.svg"}
                                  alt={review.reviewer.name}
                                />
                                <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.reviewer.name}</div>
                                <div className="text-xs text-muted-foreground">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">{review.comment}</p>
                          {review.tradeItem && (
                            <div className="mt-3 flex items-center gap-2 rounded-md bg-muted/30 p-2 text-xs">
                              <Package className="h-3 w-3" />
                              <span>Trade: {review.tradeItem}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border/60 dark:border-border/40">
                    <p className="text-muted-foreground">No reviews yet</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="badges" className="mt-0">
                {user.badges && user.badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {user.badges.map((badge, index) => (
                      <Card
                        key={index}
                        className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
                      >
                        <CardContent className="flex flex-col items-center p-4 text-center">
                          <div
                            className="mb-2 flex h-12 w-12 items-center justify-center rounded-full"
                            style={{ backgroundColor: badge.color }}
                          >
                            {badge.icon === "star" && <Star className="h-6 w-6 text-white" />}
                            {badge.icon === "shield" && <Shield className="h-6 w-6 text-white" />}
                            {badge.icon === "check" && <CheckCircle className="h-6 w-6 text-white" />}
                            {badge.icon === "warning" && <AlertTriangle className="h-6 w-6 text-white" />}
                          </div>
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border/60 dark:border-border/40">
                    <p className="text-muted-foreground">No badges earned yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Terms
              </motion.span>
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Privacy
              </motion.span>
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Contact
              </motion.span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Report User Dialog */}
      <ReportUserDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        userName={user?.name}
        userId={user?.id}
      />
    </div>
  )
}
