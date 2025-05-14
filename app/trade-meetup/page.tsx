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

export default function TradeMeetupPage() {
  const router = useRouter()
  const [meetupType, setMeetupType] = useState("midpoint")
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [midpointLocation, setMidpointLocation] = useState("coffee-shop")
  const [yourLocationOption, setYourLocationOption] = useState("default")
  const [notes, setNotes] = useState("")

  // Mock trade data
  const trade = {
    id: "trade-123",
    title: "Vintage Camera for Gaming Console",
    status: "Accepted",
    yourItem: {
      title: "Vintage Camera",
      image: "/placeholder.svg?height=100&width=100&text=Camera",
      location: "Brooklyn, NY",
    },
    theirItem: {
      title: "Gaming Console",
      image: "/placeholder.svg?height=100&width=100&text=Console",
      location: "Manhattan, NY",
    },
    owner: {
      id: "user-456",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=50&width=50&text=AJ",
      location: "Manhattan, NY",
    },
    yourLocation: "Brooklyn, NY",
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/trade-meetup/confirmation/${trade.id}`)
    }, 1500)
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Arrange Meetup</h1>
          <p className="text-muted-foreground">Set up a time and place to complete your trade</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Meetup Details</CardTitle>
                <CardDescription>Choose where and when you'd like to meet to exchange items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Meetup Location</h3>
                  <RadioGroup value={meetupType} onValueChange={setMeetupType} className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="midpoint" id="midpoint" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="midpoint" className="font-medium">
                          Meet at a midpoint
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          We'll suggest locations roughly halfway between you and the other trader
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="your-location" id="your-location" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="your-location" className="font-medium">
                          Meet at your location
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          The other trader will come to your preferred location
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="their-location" id="their-location" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="their-location" className="font-medium">
                          Meet at their location
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          You'll go to the other trader's preferred location
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="custom" id="custom" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="custom" className="font-medium">
                          Custom location
                        </Label>
                        <p className="text-sm text-muted-foreground">Specify a different meeting location</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {meetupType === "midpoint" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Suggested Midpoint Locations</h4>
                    <div className="grid gap-3">
                      <RadioGroup value={midpointLocation} onValueChange={setMidpointLocation}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="coffee-shop" id="coffee-shop" />
                          <Label htmlFor="coffee-shop" className="flex items-center gap-2 cursor-pointer">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Coffee Shop - Union Square (1.5 miles from you)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="park" id="park" />
                          <Label htmlFor="park" className="flex items-center gap-2 cursor-pointer">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Madison Square Park (2.1 miles from you)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="library" id="library" />
                          <Label htmlFor="library" className="flex items-center gap-2 cursor-pointer">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Public Library - Midtown Branch (1.8 miles from you)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {meetupType === "your-location" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Your Location</h4>
                    <p className="text-sm text-muted-foreground">
                      The other trader will meet you at your location in {trade.yourLocation}
                    </p>
                    <div className="grid gap-3">
                      <RadioGroup value={yourLocationOption} onValueChange={setYourLocationOption}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="default" id="default-location" />
                          <Label htmlFor="default-location" className="flex items-center gap-2 cursor-pointer">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Your default address in {trade.yourLocation}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="custom-your-location" />
                          <Label htmlFor="custom-your-location" className="flex items-center gap-2 cursor-pointer">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Specify a different address
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {meetupType === "their-location" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Their Location</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll meet the other trader at their location in {trade.owner.location}
                    </p>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{trade.owner.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The exact address will be shared once both parties confirm the meetup
                    </p>
                  </div>
                )}

                {meetupType === "custom" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Custom Location</h4>
                    <div className="grid gap-3">
                      <div className="grid gap-1.5">
                        <Label htmlFor="custom-location">Meeting Location</Label>
                        <Input
                          id="custom-location"
                          placeholder="Enter address or place name"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required={meetupType === "custom"}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">We recommend meeting in a public place for safety</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-medium">Meetup Time</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
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
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional details or instructions"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !date || !time}>
                  {isSubmitting ? "Sending..." : "Send Meetup Request"}
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
                    src={trade.yourItem.image || "/placeholder.svg"}
                    alt={trade.yourItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Your Item</h3>
                  <p className="text-sm text-muted-foreground">{trade.yourItem.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={trade.theirItem.image || "/placeholder.svg"}
                    alt={trade.theirItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Their Item</h3>
                  <p className="text-sm text-muted-foreground">{trade.theirItem.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={trade.owner.avatar || "/placeholder.svg"}
                    alt={trade.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{trade.owner.name}</h3>
                  <p className="text-sm text-muted-foreground">{trade.owner.location}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push(`/messages/${trade.owner.id}`)}>
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
