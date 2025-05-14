"use client"

import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Filter,
  HandshakeIcon,
  Loader2,
  MessageSquare,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Star,
  ThumbsUp,
  UserPlus,
  Users,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/context/app-context"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"

export default function NetworkPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { isAuthenticated, user } = useApp()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "connections")
  const [isLoading, setIsLoading] = useState(true)
  const [showConnectionsDialog, setShowConnectionsDialog] = useState(false)
  const [showTrustDetailsDialog, setShowTrustDetailsDialog] = useState(false)
  const [showRequestsDialog, setShowRequestsDialog] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [inviteMessage, setInviteMessage] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [connections, setConnections] = useState([])
  const [filteredConnections, setFilteredConnections] = useState([])
  const [suggestedConnections, setSuggestedConnections] = useState([])
  const [receivedRequests, setReceivedRequests] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [trustFilters, setTrustFilters] = useState({
    trusted: true,
    verified: true,
    new: true,
  })
  const [sortOption, setSortOption] = useState("recent")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Mock data for connections
  const mockConnections = [
    {
      id: "user-101",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 12,
      lastTrade: "2 days ago",
      status: "Trusted",
      categories: ["Electronics", "Books"],
    },
    {
      id: "user-102",
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 8,
      lastTrade: "1 week ago",
      status: "Trusted",
      categories: ["Clothing", "Home"],
    },
    {
      id: "user-103",
      name: "Marcus Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 15,
      lastTrade: "3 days ago",
      status: "Verified",
      categories: ["Sports", "Outdoors"],
    },
    {
      id: "user-104",
      name: "Sophia Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      trades: 5,
      lastTrade: "2 weeks ago",
      status: "New",
      categories: ["Art", "Collectibles"],
    },
    {
      id: "user-105",
      name: "Daniel Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 20,
      lastTrade: "Yesterday",
      status: "Trusted",
      categories: ["Music", "Electronics"],
    },
  ]

  // Mock data for suggested connections
  const mockSuggested = [
    {
      id: "user-201",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 37,
      mutualConnections: 5,
      categories: ["Electronics", "Collectibles"],
      connectionStatus: "none",
    },
    {
      id: "user-202",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 24,
      mutualConnections: 3,
      categories: ["Books", "Music"],
      connectionStatus: "none",
    },
    {
      id: "user-203",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 42,
      mutualConnections: 7,
      categories: ["Clothing", "Home"],
      connectionStatus: "none",
    },
    {
      id: "user-204",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      trades: 18,
      mutualConnections: 2,
      categories: ["Sports", "Outdoors"],
      connectionStatus: "none",
    },
  ]

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
  ]

  // Initialize data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be API calls
        // For now, we'll use mock data with a delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setConnections(mockConnections)
        setFilteredConnections(mockConnections)
        setSuggestedConnections(mockSuggested)
        setReceivedRequests(mockReceivedRequests)
        setSentRequests(mockSentRequests)
      } catch (error) {
        console.error("Error fetching network data:", error)
        toast({
          title: "Error",
          description: "Failed to load network data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Set active tab from URL if present
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams, toast]) // Only re-run if searchParams or toast changes

  // Filter connections based on search and filters
  useEffect(() => {
    if (connections.length === 0) return

    let filtered = [...connections]

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase()
      filtered = filtered.filter((conn) => conn.name.toLowerCase().includes(searchLower))
    }

    // Apply trust filters
    filtered = filtered.filter((conn) => {
      if (conn.status === "Trusted" && trustFilters.trusted) return true
      if (conn.status === "Verified" && trustFilters.verified) return true
      if (conn.status === "New" && trustFilters.new) return true
      return false
    })

    // Apply sorting
    if (sortOption === "recent") {
      // Sort by most recent trade
      filtered.sort((a, b) => {
        const timeA = getTimeValue(a.lastTrade)
        const timeB = getTimeValue(b.lastTrade)
        return timeA - timeB
      })
    } else if (sortOption === "rating") {
      // Sort by rating (highest first)
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortOption === "trades") {
      // Sort by number of trades (highest first)
      filtered.sort((a, b) => b.trades - a.trades)
    } else if (sortOption === "name") {
      // Sort alphabetically by name
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredConnections(filtered)
  }, [connections, searchValue, trustFilters, sortOption]) // Only re-run when these dependencies change

  // Helper function to convert time strings to numeric values for sorting
  const getTimeValue = (timeString) => {
    if (timeString.includes("day")) {
      return Number.parseInt(timeString) * 24
    } else if (timeString.includes("week")) {
      return Number.parseInt(timeString) * 24 * 7
    } else if (timeString === "Yesterday") {
      return 24
    } else {
      return 0 // Today or recent
    }
  }

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
    // Update URL without full page reload
    router.push(`/network?tab=${value}`, { scroll: false })
  }

  // Handle view all connections
  const handleViewAllConnections = () => {
    router.push("/network/connections")
  }

  // Handle view trust details
  const handleViewTrustDetails = () => {
    router.push("/network/trust")
  }

  // Handle manage requests
  const handleManageRequests = () => {
    router.push("/network/requests")
  }

  // Handle find traders
  const handleFindTraders = () => {
    router.push("/network/explore")
  }

  // Handle send invitation
  const handleSendInvitation = () => {
    setShowInviteDialog(true)
  }

  // Handle send invitation form submission
  const handleSendInvitationSubmit = (e) => {
    e.preventDefault()

    if (!inviteEmail) {
      toast({
        title: "Missing information",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    setShowInviteDialog(false)
    toast({
      title: "Invitation sent",
      description: `Your invitation has been sent to ${inviteEmail}.`,
    })

    // Reset form
    setInviteEmail("")
    setInviteName("")
    setInviteMessage("")
  }

  // Handle view trader profile
  const handleViewTraderProfile = (userId) => {
    router.push(`/profile/${userId}`)
  }

  // Handle message trader
  const handleMessageTrader = (userId) => {
    router.push(`/messages/${userId}`)
  }

  // Handle connect with trader
  const handleConnectWithTrader = (userId) => {
    // Update the connection status in the suggested connections
    setSuggestedConnections((prev) =>
      prev.map((conn) => (conn.id === userId ? { ...conn, connectionStatus: "pending" } : conn)),
    )

    toast({
      title: "Connection request sent",
      description: "Your connection request has been sent.",
    })
  }

  // Handle accept connection request
  const handleAcceptRequest = (requestId) => {
    // Find the request
    const request = receivedRequests.find((req) => req.id === requestId)

    if (!request) return

    // Remove from received requests
    setReceivedRequests((prev) => prev.filter((req) => req.id !== requestId))

    // Add to connections
    const newConnection = {
      id: request.userId,
      name: request.name,
      avatar: request.avatar,
      rating: request.rating,
      trades: request.trades,
      lastTrade: "Just now",
      status: "New",
      categories: ["General"],
    }

    setConnections((prev) => [...prev, newConnection])

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

  // Handle filter dialog open
  const handleOpenFilterDialog = () => {
    setShowFilterDialog(true)
  }

  // Handle filter apply
  const handleApplyFilters = () => {
    setShowFilterDialog(false)
    toast({
      title: "Filters applied",
      description: "Your connection list has been filtered.",
    })
  }

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/marketplace?category=${encodeURIComponent(category)}`)
  }

  // Handle load more connections
  const handleLoadMore = async () => {
    if (!hasMore) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would fetch the next page of connections
      // For demo, we'll just add more mock data
      const newConnections = mockConnections.map((conn) => ({
        ...conn,
        id: `${conn.id}-page-${page}`,
        name: `${conn.name} (${page})`,
      }))

      setConnections((prev) => [...prev, ...newConnections])
      setPage((prev) => prev + 1)

      // For demo purposes, stop after page 3
      if (page >= 3) {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more connections:", error)
      toast({
        title: "Error",
        description: "Failed to load more connections. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle back button
  const handleBack = () => {
    router.back()
  }

  // Render loading skeleton
  if (isLoading && connections.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="h-8 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-muted"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-32 animate-pulse rounded-md bg-muted"></div>
            <div className="h-10 w-36 animate-pulse rounded-md bg-muted"></div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[120px] animate-pulse rounded-lg border bg-muted/50"></div>
          ))}
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[180px] animate-pulse rounded-lg border bg-muted/50"></div>
            ))}
          </div>
        </div>

        <div className="h-10 w-full animate-pulse rounded-md bg-muted mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[100px] animate-pulse rounded-lg border bg-muted/50"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Breadcrumbs className="mb-2" />
          <h1 className="text-3xl font-bold tracking-tight">Trader Network</h1>
          <p className="text-muted-foreground">Build and manage your network of trusted traders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleFindTraders}>
            <UserPlus className="mr-2 h-4 w-4" />
            Find Traders
          </Button>
          <Button onClick={handleSendInvitation}>
            <Plus className="mr-2 h-4 w-4" />
            Send Invitation
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connections.length}</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={handleViewAllConnections}>
              <div className="flex items-center">
                View all connections
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Based on 45 trades with network</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={handleViewTrustDetails}>
              <div className="flex items-center">
                View trust details
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receivedRequests.length + sentRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              {sentRequests.length} sent, {receivedRequests.length} received
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={handleManageRequests}>
              <div className="flex items-center">
                Manage requests
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Suggested Connections</h2>
          <Button variant="ghost" size="sm" onClick={handleFindTraders}>
            View All
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {suggestedConnections.length > 0 ? (
            suggestedConnections.map((trader) => (
              <SuggestedTraderCard
                key={trader.id}
                trader={trader}
                onViewProfile={() => handleViewTraderProfile(trader.id)}
                onConnect={() => handleConnectWithTrader(trader.id)}
              />
            ))
          ) : (
            <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Users className="mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No suggestions available</h3>
              <p className="text-sm text-muted-foreground">
                We'll suggest new connections as you use the platform more.
              </p>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} id="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections" id="connections">
            My Connections
          </TabsTrigger>
          <TabsTrigger value="requests" id="requests">
            Pending Requests
            {receivedRequests.length + sentRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {receivedRequests.length + sentRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="trust" id="trust">
            Trust Scores
          </TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="connections" className="mt-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your connections..."
                className="pl-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleOpenFilterDialog}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <ErrorBoundary>
            {filteredConnections.length > 0 ? (
              <div className="space-y-4">
                {filteredConnections.map((connection) => (
                  <ConnectionCard
                    key={connection.id}
                    connection={connection}
                    onViewProfile={() => handleViewTraderProfile(connection.id)}
                    onMessage={() => handleMessageTrader(connection.id)}
                    onCategoryClick={handleCategoryClick}
                  />
                ))}

                {hasMore && (
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More Connections"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <Users className="mb-2 h-8 w-8 text-muted-foreground" />
                <h3 className="text-lg font-medium">No connections found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchValue
                    ? "Try a different search term or adjust your filters."
                    : "Start building your network by connecting with other traders."}
                </p>
                {!searchValue && (
                  <Button className="mt-4" onClick={handleFindTraders}>
                    Find Traders
                  </Button>
                )}
              </div>
            )}
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="requests" className="mt-6">
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-medium">Received Requests ({receivedRequests.length})</h3>
            {receivedRequests.length > 0 ? (
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
              <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                <p className="text-muted-foreground">You don't have any pending connection requests.</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Sent Requests ({sentRequests.length})</h3>
            {sentRequests.length > 0 ? (
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
              <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                <p className="text-muted-foreground">You haven't sent any connection requests.</p>
                <Button className="mt-4" onClick={handleFindTraders}>
                  Find Traders
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="trust" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
              <CardHeader>
                <CardTitle>Your Trust Score</CardTitle>
                <CardDescription>How your network rates your trading reliability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <ShieldCheck className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">92%</div>
                      <p className="text-sm text-muted-foreground">Excellent</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">45</div>
                    <p className="text-sm text-muted-foreground">Network trades</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 text-sm font-medium">Trust Factors</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>On-time meetups</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Item condition accuracy</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Communication</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Fair negotiations</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/reviews")}>
                  View Detailed Feedback
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
              <CardHeader>
                <CardTitle>Network Trust Levels</CardTitle>
                <CardDescription>Trust breakdown of your trading network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Trusted
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>90%+ trust score, 10+ successful trades</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span>90%+ trust score</span>
                    </div>
                    <span className="font-medium">18</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              Verified
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>75-89% trust score, 5+ successful trades</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span>75-89% trust score</span>
                    </div>
                    <span className="font-medium">7</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="mr-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              New
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Less than 5 trades or new to the platform</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span>Less than 5 trades</span>
                    </div>
                    <span className="font-medium">3</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium">Trust Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                      <span className="text-sm">Priority access to new listings from trusted traders</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                      <span className="text-sm">Simplified trade process with trusted network members</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                      <span className="text-sm">Higher visibility in search results and recommendations</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/about/trust-system")}>
                  Learn About Trust Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <div className="space-y-4">
            <ActivityItem
              icon={<UserPlus className="h-4 w-4" />}
              title="New connection with Sarah Johnson"
              description="You and Sarah are now connected"
              time="2 hours ago"
              actionLabel="View Profile"
              actionHref="/profile/user-203"
            />
            <ActivityItem
              icon={<HandshakeIcon className="h-4 w-4" />}
              title="Successful trade with Alex Johnson"
              description="Camera equipment trade completed successfully"
              time="Yesterday"
              actionLabel="View Trade"
              actionHref="/my-trades/tr-12345"
            />
            <ActivityItem
              icon={<ThumbsUp className="h-4 w-4" />}
              title="Positive review from Marcus Wilson"
              description="Marcus gave you a 5-star rating for your recent trade"
              time="3 days ago"
              actionLabel="View Review"
              actionHref="/reviews"
            />
            <ActivityItem
              icon={<Shield className="h-4 w-4" />}
              title="Trust score increased"
              description="Your trust score increased to 92%"
              time="1 week ago"
              actionLabel="View Details"
              actionHref="/network/trust"
            />
            <ActivityItem
              icon={<MessageSquare className="h-4 w-4" />}
              title="New message from Jessica Lee"
              description="Jessica sent you a message about your vintage records"
              time="1 week ago"
              actionLabel="View Message"
              actionHref="/messages/user-102"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Send Invitation Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite a Trader</DialogTitle>
            <DialogDescription>Send an invitation to connect with a new trader</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendInvitationSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="trader@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Personal Message</Label>
                <Textarea
                  id="message"
                  placeholder="I'd like to connect with you on NeoTradez for trading collectibles..."
                  rows={3}
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Trading Interests (optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {["Electronics", "Collectibles", "Books", "Music", "Clothing", "Sports"].map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => {
                        if (selectedCategories.includes(category)) {
                          setSelectedCategories((prev) => prev.filter((c) => c !== category))
                        } else {
                          setSelectedCategories((prev) => [...prev, category])
                        }
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowInviteDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filter Connections</DialogTitle>
            <DialogDescription>Customize how your connections are displayed</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Trust Status</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trusted"
                    checked={trustFilters.trusted}
                    onCheckedChange={(checked) => setTrustFilters((prev) => ({ ...prev, trusted: !!checked }))}
                  />
                  <Label htmlFor="trusted" className="flex items-center">
                    <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Trusted
                    </Badge>
                    <span>90%+ trust score</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={trustFilters.verified}
                    onCheckedChange={(checked) => setTrustFilters((prev) => ({ ...prev, verified: !!checked }))}
                  />
                  <Label htmlFor="verified" className="flex items-center">
                    <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Verified
                    </Badge>
                    <span>75-89% trust score</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new"
                    checked={trustFilters.new}
                    onCheckedChange={(checked) => setTrustFilters((prev) => ({ ...prev, new: !!checked }))}
                  />
                  <Label htmlFor="new" className="flex items-center">
                    <Badge className="mr-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      New
                    </Badge>
                    <span>Less than 5 trades</span>
                  </Label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Sort By</h4>
              <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent Trade</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="trades">Most Trades</SelectItem>
                  <SelectItem value="name">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// SuggestedTraderCard Component
function SuggestedTraderCard({ trader, onViewProfile, onConnect }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="cursor-pointer transition-transform duration-200 hover:scale-105" onClick={onViewProfile}>
            <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
            <AvatarFallback>
              {trader.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3
              className="font-medium cursor-pointer hover:underline transition-colors duration-200 hover:text-primary"
              onClick={onViewProfile}
            >
              {trader.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              <span>
                {trader.rating} ({trader.trades} trades)
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3 text-xs text-muted-foreground">
          <Users className="mr-1 inline-block h-3 w-3" />
          {trader.mutualConnections} mutual connections
        </div>
        <div className="mb-3 flex flex-wrap gap-1">
          {trader.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <Button
          size="sm"
          className="w-full transition-transform duration-200 hover:scale-105"
          onClick={onConnect}
          disabled={trader.connectionStatus === "pending"}
        >
          {trader.connectionStatus === "pending" ? (
            <>
              <Clock className="mr-2 h-3 w-3" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-3 w-3" />
              Connect
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// ConnectionCard Component
function ConnectionCard({ connection, onViewProfile, onMessage, onCategoryClick }) {
  const statusColors = {
    Trusted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Verified: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    New: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-4 hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <Avatar
          className="cursor-pointer h-12 w-12 transition-transform duration-200 hover:scale-105"
          onClick={onViewProfile}
        >
          <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
          <AvatarFallback>
            {connection.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3
              className="font-medium cursor-pointer hover:underline transition-colors duration-200 hover:text-primary"
              onClick={onViewProfile}
            >
              {connection.name}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className={statusColors[connection.status]} variant="outline">
                    {connection.status}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {connection.status === "Trusted" && "90%+ trust score, 10+ successful trades"}
                    {connection.status === "Verified" && "75-89% trust score, 5+ successful trades"}
                    {connection.status === "New" && "Less than 5 trades or new to the platform"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              <span>{connection.rating}</span>
            </div>
            <div className="flex items-center">
              <HandshakeIcon className="mr-1 h-3 w-3" />
              <span>{connection.trades} trades</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>Last trade: {connection.lastTrade}</span>
            </div>
          </div>
          {connection.categories && connection.categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {connection.categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-primary/10 transition-colors duration-200 hover:text-primary"
                  onClick={() => onCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 self-end sm:self-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewProfile}
          className="transition-transform duration-200 hover:scale-105"
        >
          Profile
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onMessage}
          className="transition-transform duration-200 hover:scale-105"
        >
          Message
        </Button>
      </div>
    </div>
  )
}

// RequestCard Component
function RequestCard({ request, type, onAccept, onDecline, onCancel, onViewProfile }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="cursor-pointer transition-transform duration-200 hover:scale-105" onClick={onViewProfile}>
            <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
            <AvatarFallback>
              {request.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3
              className="font-medium cursor-pointer hover:underline transition-colors duration-200 hover:text-primary"
              onClick={onViewProfile}
            >
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
            <Button className="flex-1 transition-transform duration-200 hover:scale-105" onClick={onAccept}>
              Accept
            </Button>
            <Button
              variant="outline"
              className="flex-1 transition-transform duration-200 hover:scale-105"
              onClick={onDecline}
            >
              Decline
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 transition-transform duration-200 hover:scale-105"
              onClick={onCancel}
            >
              Cancel Request
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-none transition-transform duration-200 hover:scale-105"
              onClick={onViewProfile}
            >
              View Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ActivityItem Component
function ActivityItem({ icon, title, description, time, actionLabel, actionHref }) {
  return (
    <div className="flex items-start space-x-4 rounded-lg border p-4 hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <Button variant="ghost" size="sm" asChild className="transition-transform duration-200 hover:scale-105">
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  )
}
