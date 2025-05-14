"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Check, Clock, MapPin, MessageSquare, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { SafetyTipsDialog } from "@/components/safety-tips-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { PageInfoAlert } from "@/components/page-info-alert"

export default function TradeMeetupConfirmationPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params
  const [isSharing, setIsSharing] = useState(false)
  const [safetyTipsOpen, setSafetyTipsOpen] = useState(false)

  // Mock trade data
  const trade = {
    id: id || "trade-123",
    referenceNumber: "NT" + (id || "123456").substring(0, 6).toUpperCase(),
    status: "Meetup Scheduled",
    yourItem: {
      title: "Vintage Polaroid Camera",
      image: "/placeholder.svg?height=100&width=100&text=Camera",
      value: "$120",
      condition: "Good",
    },
    theirItem: {
      title: "PlayStation 5 Console",
      image: "/placeholder.svg?height=100&width=100&text=PS5",
      value: "$450",
      condition: "Like New",
    },
    trader: {
      id: "user-456",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=50&width=50&text=AJ",
      rating: 4.8,
      trades: 24,
    },
    meetup: {
      location: {
        name: "Starbucks - Union Square",
        address: "25 Union Square W, New York, NY 10003",
        type: "Café",
        safetyRating: 4.5,
      },
      date: "2025-06-15",
      timeRange: "Afternoon (12:00 PM - 5:00 PM)",
      notes: "I'll be wearing a blue jacket. Let me know if you need to reschedule.",
    },
    acceptedDate: "2025-05-16T10:15:00",
  }

  const handleShare = () => {
    setIsSharing(true)

    // Simulate sharing functionality
    setTimeout(() => {
      setIsSharing(false)
      toast({
        title: "Meetup details shared",
        description: "A link has been copied to your clipboard.",
      })
    }, 1000)
  }

  const handleChatOpen = () => {
    router.push(`/messages/${trade.trader.id}`)
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

      <div className="container px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Meetup Confirmed</h1>
            <p className="text-muted-foreground">Your trade meetup has been scheduled</p>
          </div>
        </div>

        <PageInfoAlert
          title="Meetup Confirmation"
          description="This page contains all the details about your upcoming trade meetup. You can share these details, message your trading partner, or make changes if needed."
        />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Success Message */}
              <Card className="mb-6 overflow-hidden border-[#00D084]/30 bg-[#00D084]/5 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00D084]/20">
                      <Check className="h-6 w-6 text-[#00D084]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Meetup Successfully Scheduled!</h2>
                      <p className="text-muted-foreground">
                        You and {trade.trader.name} have agreed to meet and complete your trade.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trade Summary */}
              <Card className="mb-6 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <Badge className="mb-2 bg-blue-500/10 text-blue-500">{trade.status}</Badge>
                      <h2 className="text-xl font-semibold">Reference: {trade.referenceNumber}</h2>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Accepted on {new Date(trade.acceptedDate).toLocaleDateString()}</div>
                      <div>{new Date(trade.acceptedDate).toLocaleTimeString()}</div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <Image
                            src={trade.yourItem.image || "/placeholder.svg"}
                            alt={trade.yourItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">Your Item</h3>
                          <p className="text-lg font-semibold">{trade.yourItem.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{trade.yourItem.value}</span>
                            <span>•</span>
                            <span>{trade.yourItem.condition}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <Image
                            src={trade.theirItem.image || "/placeholder.svg"}
                            alt={trade.theirItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Their Item</h3>
                            <div className="flex items-center gap-1">
                              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                                <Image
                                  src={trade.trader.avatar || "/placeholder.svg"}
                                  alt={trade.trader.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">{trade.trader.name}</span>
                            </div>
                          </div>
                          <p className="text-lg font-semibold">{trade.theirItem.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{trade.theirItem.value}</span>
                            <span>•</span>
                            <span>{trade.theirItem.condition}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meetup Details */}
              <Card className="mb-6 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Meetup Details</h2>

                  <div className="mb-6 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{trade.meetup.location.name}</h3>
                        <p className="text-sm text-muted-foreground">{trade.meetup.location.address}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="bg-[#3B82F6]/10 text-[#3B82F6]">
                            {trade.meetup.location.type}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            Safety Rating: {trade.meetup.location.safetyRating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#00D084]/10 text-[#00D084]">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Date</h3>
                          <p className="text-muted-foreground">
                            {new Date(trade.meetup.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#00D084]/10 text-[#00D084]">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Time</h3>
                          <p className="text-muted-foreground">{trade.meetup.timeRange}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {trade.meetup.notes && (
                    <div className="mt-4 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                      <h3 className="mb-2 font-medium">Additional Notes</h3>
                      <p className="text-sm text-muted-foreground">{trade.meetup.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="mb-6 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Next Steps</h2>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Communicate with {trade.trader.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Use the chat to confirm details and coordinate your meetup
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">Meet at the agreed location</h3>
                        <p className="text-sm text-muted-foreground">
                          Bring your item and meet at {trade.meetup.location.name} on{" "}
                          {new Date(trade.meetup.date).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Complete the trade</h3>
                        <p className="text-sm text-muted-foreground">
                          Exchange items and mark the trade as completed in the site
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium">Leave a review</h3>
                        <p className="text-sm text-muted-foreground">
                          Share your experience to help build trust in the community
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084]/90 hover:to-[#3B82F6]/90"
                  onClick={handleChatOpen}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Open Chat with {trade.trader.name}
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  {isSharing ? "Sharing..." : "Share Meetup Details"}
                </Button>
              </div>
            </motion.div>
          </div>

          <div>
            {/* Trader Profile Card */}
            <Card className="mb-6 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Trading With</h2>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={trade.trader.avatar || "/placeholder.svg"}
                      alt={trade.trader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{trade.trader.name}</h3>
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 fill-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="font-medium">{trade.trader.rating}</span>
                      <span className="text-sm text-muted-foreground">({trade.trader.trades} trades)</span>
                    </div>
                    <Button
                      variant="link"
                      className="mt-1 h-auto p-0 text-sm"
                      onClick={() => router.push(`/user/${trade.trader.id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help Card */}
            <Card className="overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Need Help?</h2>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setSafetyTipsOpen(true)}
                  >
                    <div>
                      <h3 className="font-medium text-left">Meetup Safety Tips</h3>
                      <p className="text-sm text-muted-foreground text-left">
                        Learn how to stay safe during in-person trades
                      </p>
                    </div>
                  </Button>
                  <Link href="/help/cancel-trade">
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                      <div>
                        <h3 className="font-medium text-left">Need to Cancel?</h3>
                        <p className="text-sm text-muted-foreground text-left">How to cancel or reschedule a meetup</p>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                      <div>
                        <h3 className="font-medium text-left">Contact Support</h3>
                        <p className="text-sm text-muted-foreground text-left">Get help from our support team</p>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SafetyTipsDialog open={safetyTipsOpen} onOpenChange={setSafetyTipsOpen} />
    </div>
  )
}
