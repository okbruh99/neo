"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, HandshakeIcon, Clock, Search, Filter, ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ConnectionsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [connections, setConnections] = useState([])
  const [filteredConnections, setFilteredConnections] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
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
    // Add more mock connections
    {
      id: "user-106",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 37,
      lastTrade: "3 days ago",
      status: "Trusted",
      categories: ["Electronics", "Collectibles"],
    },
    {
      id: "user-107",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 24,
      lastTrade: "1 week ago",
      status: "Verified",
      categories: ["Books", "Music"],
    },
    {
      id: "user-108",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 42,
      lastTrade: "Yesterday",
      status: "Trusted",
      categories: ["Clothing", "Home"],
    },
    {
      id: "user-109",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      trades: 18,
      lastTrade: "2 weeks ago",
      status: "New",
      categories: ["Sports", "Outdoors"],
    },
    {
      id: "user-110",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      trades: 7,
      lastTrade: "1 month ago",
      status: "New",
      categories: ["Art", "Collectibles"],
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
      } catch (error) {
        console.error("Error fetching connections:", error)
        toast({
          title: "Error",
          description: "Failed to load connections. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

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
  }, [connections, searchValue, trustFilters, sortOption])

  // Helper function to convert time strings to numeric values for sorting
  const getTimeValue = (timeString) => {
    if (timeString.includes("day")) {
      return Number.parseInt(timeString) * 24
    } else if (timeString.includes("week")) {
      return Number.parseInt(timeString) * 24 * 7
    } else if (timeString.includes("month")) {
      return Number.parseInt(timeString) * 24 * 30
    } else if (timeString === "Yesterday") {
      return 24
    } else {
      return 0 // Today or recent
    }
  }

  // Handle view trader profile
  const handleViewTraderProfile = (userId) => {
    router.push(`/profile/${userId}`)
  }

  // Handle message trader
  const handleMessageTrader = (userId) => {
    router.push(`/messages/${userId}`)
  }

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/marketplace?category=${encodeURIComponent(category)}`)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Network
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">All Connections</h1>
        <p className="text-muted-foreground">You have {connections.length} connections in your trader network</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent Trade</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="trades">Most Trades</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleOpenFilterDialog}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {isLoading && connections.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[100px] animate-pulse rounded-lg border bg-muted/50"></div>
          ))}
        </div>
      ) : filteredConnections.length > 0 ? (
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
          <h3 className="text-lg font-medium">No connections found</h3>
          <p className="text-sm text-muted-foreground">
            {searchValue
              ? "Try a different search term or adjust your filters."
              : "Start building your network by connecting with other traders."}
          </p>
          {!searchValue && (
            <Button className="mt-4" onClick={() => router.push("/network/explore")}>
              Find Traders
            </Button>
          )}
        </div>
      )}

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

// ConnectionCard Component
function ConnectionCard({ connection, onViewProfile, onMessage, onCategoryClick }) {
  const statusColors = {
    Trusted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Verified: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    New: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="cursor-pointer h-12 w-12" onClick={onViewProfile}>
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
            <h3 className="font-medium cursor-pointer hover:underline" onClick={onViewProfile}>
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
                  className="text-xs cursor-pointer hover:bg-primary/10"
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
        <Button variant="outline" size="sm" onClick={onViewProfile}>
          Profile
        </Button>
        <Button variant="outline" size="sm" onClick={onMessage}>
          Message
        </Button>
      </div>
    </div>
  )
}
