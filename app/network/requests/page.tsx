"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function RequestsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [receivedRequests, setReceivedRequests] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [activeTab, setActiveTab] = useState("received")

  // Mock data for received requests
  const mockReceivedRequests = [
    {
      id: "req-101",
      userId: "user-301",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      trades: 7,
      mutualConnections: 2,
      message: "I'd like to connect with you for potential trades in vintage collectibles.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "req-102",
      userId: "user-302",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.3,
      trades: 5,
      mutualConnections: 1,
      message: "I saw your collection of vinyl records and would love to connect for potential trades.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  // Mock data for sent requests
  const mockSentRequests = [
    {
      id: "req-201",
      userId: "user-401",
      name: "Noah Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 15,
      mutualConnections: 4,
      message: "I'm interested in your collection of vinyl records. Let's connect!",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "req-202",
      userId: "user-402",
      name: "Ava Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 22,
      mutualConnections: 3,
      message: "I saw your camera collection and would love to connect for potential trades.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "req-203",
      userId: "user-403",
      name: "Ethan Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      trades: 12,
      mutualConnections: 2,
      message: "I noticed we have similar interests in vintage electronics. Would love to connect!",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  // Initialize data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be API calls
        // For now, we'll use mock data with a delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setReceivedRequests(mockReceivedRequests)
        setSentRequests(mockSentRequests)
      } catch (error) {
        console.error("Error fetching requests:", error)
        toast({
          title: "Error",
          description: "Failed to load connection requests. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Handle view trader profile
  const handleViewTraderProfile = (userId) => {
    router.push(`/profile/${userId}`)
  }

  // Handle accept connection request
  const handleAcceptRequest = (requestId) => {
    // Find the request
    const request = receivedRequests.find((req) => req.id === requestId)

    if (!request) return

    // Remove from received requests
    setReceivedRequests((prev) => prev.filter((req) => req.id !== requestId))

    toast({
      title: "Connection accepted",
      description: `You are now connected with ${request.name}.`,
    })
  }

  // Handle decline connection request
  const handleDeclineRequest = (requestId) => {
    // Find the request
    const request = receivedRequests.find((req) => req.id === requestId)

    if (!request) return

    // Remove from received requests
    setReceivedRequests((prev) => prev.filter((req) => req.id !== requestId))

    toast({
      title: "Connection declined",
      description: `You have declined the connection request from ${request.name}.`,
    })
  }

  // Handle cancel connection request
  const handleCancelRequest = (requestId) => {
    // Find the request
    const request = sentRequests.find((req) => req.id === requestId)

    if (!request) return

    // Remove from sent requests
    setSentRequests((prev) => prev.filter((req) => req.id !== requestId))

    toast({
      title: "Request canceled",
      description: `Your connection request to ${request.name} has been canceled.`,
    })
  }

  // Handle back button
  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Network
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Connection Requests</h1>
        <p className="text-muted-foreground">Manage your pending connection requests</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received">
            Received
            {receivedRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {receivedRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent">
            Sent
            {sentRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {sentRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="mt-6">
          <h2 className="mb-4 text-xl font-semibold">Received Requests</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[180px] animate-pulse rounded-lg border bg-muted/50"></div>
              ))}
            </div>
          ) : receivedRequests.length > 0 ? (
            <div className="space-y-4">
              {receivedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type="received"
                  onAccept={() => handleAcceptRequest(request.id)}
                  onDecline={() => handleDeclineRequest(request.id)}
                  onViewProfile={() => handleViewTraderProfile(request.userId)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No pending requests</h3>
              <p className="text-sm text-muted-foreground">
                You don't have any pending connection requests at the moment.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          <h2 className="mb-4 text-xl font-semibold">Sent Requests</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[180px] animate-pulse rounded-lg border bg-muted/50"></div>
              ))}
            </div>
          ) : sentRequests.length > 0 ? (
            <div className="space-y-4">
              {sentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type="sent"
                  onCancel={() => handleCancelRequest(request.id)}
                  onViewProfile={() => handleViewTraderProfile(request.userId)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No sent requests</h3>
              <p className="text-sm text-muted-foreground">You haven't sent any connection requests yet.</p>
              <Button className="mt-4" onClick={() => router.push("/network/explore")}>
                Find Traders
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// RequestCard Component
function RequestCard({ request, type, onAccept, onDecline, onCancel, onViewProfile }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="cursor-pointer" onClick={onViewProfile}>
            <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
            <AvatarFallback>
              {request.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium cursor-pointer hover:underline" onClick={onViewProfile}>
              {request.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              <span>
                {request.rating} ({request.trades} trades)
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3 text-xs text-muted-foreground">
          <Users className="mr-1 inline-block h-3 w-3" />
          {request.mutualConnections} mutual connections
        </div>
        <div className="mb-4 rounded-lg bg-muted p-3 text-sm">
          <p>{request.message}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(request.timestamp).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {type === "received" ? (
          <div className="flex gap-2">
            <Button className="flex-1" onClick={onAccept}>
              Accept
            </Button>
            <Button variant="outline" className="flex-1" onClick={onDecline}>
              Decline
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onCancel}>
              Cancel Request
            </Button>
            <Button variant="ghost" size="sm" className="flex-none" onClick={onViewProfile}>
              View Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
