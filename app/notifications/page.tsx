"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bell, Check, Clock, Filter, MessageSquare, Package, Search, Star } from "lucide-react"

export default function NotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock notifications data
  const allNotifications = [
    {
      id: "notif-1",
      type: "trade",
      title: "New Trade Proposal",
      description: "Alex Johnson has proposed a trade for your vintage camera",
      time: "10 minutes ago",
      read: false,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      actionUrl: "/my-trades",
    },
    {
      id: "notif-2",
      type: "message",
      title: "New Message",
      description: "Sarah Miller sent you a message about your mechanical keyboard",
      time: "1 hour ago",
      read: false,
      user: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      actionUrl: "/messages",
    },
    {
      id: "notif-3",
      type: "review",
      title: "New Review",
      description: "Michael Chen gave you a 5-star rating for your recent trade",
      time: "2 hours ago",
      read: true,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      actionUrl: "/reviews",
    },
    {
      id: "notif-4",
      type: "system",
      title: "Account Verified",
      description: "Your account has been successfully verified",
      time: "1 day ago",
      read: true,
      actionUrl: "/profile",
    },
    {
      id: "notif-5",
      type: "trade",
      title: "Trade Accepted",
      description: "Jamie Lee has accepted your trade proposal",
      time: "2 days ago",
      read: true,
      user: {
        name: "Jamie Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      actionUrl: "/my-trades",
    },
  ]

  // Filter notifications based on active tab and search query
  const filteredNotifications = allNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return !notification.read && matchesSearch
    if (activeTab === "trades") return notification.type === "trade" && matchesSearch
    if (activeTab === "messages") return notification.type === "message" && matchesSearch
    return matchesSearch
  })

  const unreadCount = allNotifications.filter((n) => !n.read).length

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "trade":
        return <Package className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "review":
        return <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-muted-foreground">Stay updated with your trading activity and platform announcements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Mark All as Read
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2" onClick={() => setActiveTab("all")}>
            All
            <Badge variant="secondary" className="ml-1">
              {allNotifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2" onClick={() => setActiveTab("unread")}>
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="trades" onClick={() => setActiveTab("trades")}>
            Trades
          </TabsTrigger>
          <TabsTrigger value="messages" onClick={() => setActiveTab("messages")}>
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <EmptyState query={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <EmptyState type="unread" query={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <EmptyState type="trades" query={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <EmptyState type="messages" query={searchQuery} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationCard({ notification }) {
  const [isRead, setIsRead] = useState(notification.read)
  const router = useRouter()

  const handleMarkAsRead = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsRead(true)
  }

  const handleMarkAsUnread = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsRead(false)
  }

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "trade":
        return <Package className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "review":
        return <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <Link href={notification.actionUrl}>
      <motion.div
        initial={{ opacity: 0.8, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className={`rounded-lg border p-4 transition-colors ${
          !isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : "bg-background"
        }`}
      >
        {/* Notification content */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-medium ${!isRead ? "text-blue-600 dark:text-blue-400" : ""}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {!isRead ? (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMarkAsRead}>
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Mark as read</span>
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMarkAsUnread}>
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Mark as unread</span>
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {notification.user && (
                  <>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                      <AvatarFallback>
                        {notification.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{notification.user.name}</span>
                  </>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function EmptyState({ type = "all", query = "" }) {
  let message = "No notifications found"
  let description = query ? "No notifications match your search query." : "You don't have any notifications yet."

  if (type === "unread" && !query) {
    message = "No unread notifications"
    description = "You've read all your notifications."
  } else if (type === "trades" && !query) {
    message = "No trade notifications"
    description = "You don't have any trade notifications yet."
  } else if (type === "messages" && !query) {
    message = "No message notifications"
    description = "You don't have any message notifications yet."
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <Bell className="mb-2 h-8 w-8 text-muted-foreground" />
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
