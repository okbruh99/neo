"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ArrowLeft, CalendarIcon, Clock, MapPin, MessageSquare, User } from "lucide-react"

export default function RespondToMeetupPage({ params }) {
  const router = useRouter()
  const { id } = params
  const [response, setResponse] = useState("accept")
  const [date, setDate] = useState(new Date("2025-05-25"))
  const [time, setTime] = useState("14:30")
  const [location, setLocation] = useState("Madison Square Park")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock meetup request data
  const meetupRequest = {
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
    location: {
      name: "Madison Square Park",
      address: "Madison Ave & E 23rd St, New York, NY 10010",
    },
    date: "May 25, 2025",
    time: "2:30 PM",
    notes: "I'll be wearing a blue jacket. Let's meet near the fountain.",
    createdAt: "May 15, 2025",
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      if (response === "accept") {
        router.push(`/trade-meetup/accepted/${meetupRequest.id}`)
      } else {
        router.push(`/trade-meetup/suggested/${meetupRequest.id}`)
      }
    }, 1500)
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Respond to Meetup Request</h1>
          <p className="text-muted-foreground">{meetupRequest.trade.owner.name} has requested to meet for your trade</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Meetup Request</CardTitle>
                <CardDescription>Review the proposed meetup details and respond</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Proposed Meetup Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{meetupRequest.location.name}</h4>
                        <p className="text-sm text-muted-foreground">{meetupRequest.location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Date</h4>
                        <p className="text-sm text-muted-foreground">{meetupRequest.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Time</h4>
                        <p className="text-sm text-muted-foreground">{meetupRequest.time}</p>
                      </div>
                    </div>
                    {meetupRequest.notes && (
                      <div className="pt-2">
                        <h4 className="font-medium">Additional Notes</h4>
                        <p className="text-sm text-muted-foreground">{meetupRequest.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Your Response</h3>
                  <RadioGroup value={response} onValueChange={setResponse} className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="accept" id="accept" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="accept" className="font-medium">
                          Accept the meetup request
                        </Label>
                        <p className="text-sm text-muted-foreground">I agree with the proposed time and location</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="suggest" id="suggest" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="suggest" className="font-medium">
                          Suggest changes
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I'd like to suggest a different time or location
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="decline" id="decline" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="decline" className="font-medium">
                          Decline the meetup
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I'm not interested in proceeding with this trade
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {response === "suggest" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Suggest Alternative</h4>
                    <div className="grid gap-4">
                      <div className="grid gap-1.5">
                        <Label htmlFor="alt-location">Alternative Location</Label>
                        <Input
                          id="alt-location"
                          placeholder="Enter address or place name"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-1.5">
                          <Label htmlFor="alt-date">Alternative Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="alt-date"
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="alt-time">Alternative Time</Label>
                          <Input id="alt-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {response === "decline" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Reason for Declining</h4>
                    <div className="grid gap-1.5">
                      <Label htmlFor="decline-reason">Message to Trader</Label>
                      <Textarea
                        id="decline-reason"
                        placeholder="Explain why you're declining the meetup request"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {response !== "decline" && (
                  <div className="grid gap-1.5">
                    <Label htmlFor="response-notes">Additional Notes</Label>
                    <Textarea
                      id="response-notes"
                      placeholder="Add any additional details or instructions"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || (response === "decline" && !notes)}
                  variant={response === "decline" ? "destructive" : "default"}
                >
                  {isSubmitting
                    ? "Sending..."
                    : response === "accept"
                      ? "Accept Meetup"
                      : response === "suggest"
                        ? "Suggest Changes"
                        : "Decline Meetup"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Trade Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={meetupRequest.trade.yourItem.image || "/placeholder.svg"}
                    alt={meetupRequest.trade.yourItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Your Item</h3>
                  <p className="text-sm text-muted-foreground">{meetupRequest.trade.yourItem.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={meetupRequest.trade.theirItem.image || "/placeholder.svg"}
                    alt={meetupRequest.trade.theirItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Their Item</h3>
                  <p className="text-sm text-muted-foreground">{meetupRequest.trade.theirItem.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={meetupRequest.trade.owner.avatar || "/placeholder.svg"}
                    alt={meetupRequest.trade.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{meetupRequest.trade.owner.name}</h3>
                  <p className="text-sm text-muted-foreground">Requested this meetup</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/messages/${meetupRequest.trade.owner.id}`)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Trader
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-4 rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Safety Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Meet in a public place with plenty of people around</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Schedule meetups during daylight hours when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <User className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Consider bringing a friend to the meetup</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Keep all communication within the app</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
