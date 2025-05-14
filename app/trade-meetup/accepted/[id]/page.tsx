"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, MessageSquare, Share2, CheckCircle, AlertTriangle } from "lucide-react"

export default function MeetupAcceptedPage({ params }) {
  const router = useRouter()
  const { id } = params

  // Mock meetup data
  const meetup = {
    id: id,
    trade: {
      id: "trade-123",
      title: "Vintage Camera for Gaming Console",
      yourItem: {
        title: "Gaming Console",
        image: "/placeholder.svg?height=100&width=100&text=Console",
      },
      theirItem: {
        title: "Vintage Camera",
        image: "/placeholder.svg?height=100&width=100&text=Camera",
      },
      owner: {
        id: "user-789",
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=50&width=50&text=JS",
      },
    },
    status: "confirmed",
    location: {
      name: "Madison Square Park",
      address: "Madison Ave & E 23rd St, New York, NY 10010",
      coordinates: {
        lat: 40.742,
        lng: -73.9874,
      },
    },
    date: "May 25, 2025",
    time: "2:30 PM",
    notes: "I'll be wearing a blue jacket. Let's meet near the fountain.",
    createdAt: "May 15, 2025",
    confirmedAt: "May 16, 2025",
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Meetup Confirmed</h1>
          <p className="text-muted-foreground">You've accepted the meetup request</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 dark:from-green-900/20 dark:to-green-800/10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-green-500/20 p-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Meetup Confirmed!</h2>
                <p className="text-muted-foreground">You and {meetup.trade.owner.name} have agreed to meet</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Confirmed
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-medium">Meetup Details</h3>
                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{meetup.location.name}</h4>
                      <p className="text-sm text-muted-foreground">{meetup.location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Date</h4>
                      <p className="text-sm text-muted-foreground">{meetup.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Time</h4>
                      <p className="text-sm text-muted-foreground">{meetup.time}</p>
                    </div>
                  </div>
                  {meetup.notes && (
                    <div className="pt-2">
                      <h4 className="font-medium">Additional Notes</h4>
                      <p className="text-sm text-muted-foreground">{meetup.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-medium">Trade Summary</h3>
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-medium">{meetup.trade.title}</h4>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Your Item</p>
                      <div className="flex items-center gap-2">
                        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                          <Image
                            src={meetup.trade.yourItem.image || "/placeholder.svg"}
                            alt={meetup.trade.yourItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm">{meetup.trade.yourItem.title}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Their Item</p>
                      <div className="flex items-center gap-2">
                        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                          <Image
                            src={meetup.trade.theirItem.image || "/placeholder.svg"}
                            alt={meetup.trade.theirItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm">{meetup.trade.theirItem.title}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t pt-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={meetup.trade.owner.avatar || "/placeholder.svg"}
                        alt={meetup.trade.owner.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{meetup.trade.owner.name}</h4>
                      <p className="text-xs text-muted-foreground">Trading Partner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap justify-between gap-4 border-t p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => router.push(`/messages/${meetup.trade.owner.id}`)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Trader
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Details
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push(`/trade-meetup/edit/${meetup.id}`)}>
                Reschedule
              </Button>
              <Button variant="destructive" onClick={() => router.push(`/trade-meetup/cancel/${meetup.id}`)}>
                Cancel Meetup
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-4 rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
            <div>
              <h3 className="font-medium">Important Reminders</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">
                    Bring your item in the condition described in your listing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">
                    Arrive on time and let the other person know if you're running late
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">
                    Inspect the item you're receiving before completing the trade
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">
                    Mark the trade as completed in the app after the exchange
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            onClick={() => router.push(`/calendar/add-event/${meetup.id}`)}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  )
}
