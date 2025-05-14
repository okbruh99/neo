"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Check,
  MessageSquare,
  ArrowLeftRight,
  Star,
  Calendar,
  Settings,
  CheckCheck,
  AlertTriangle,
  Award,
  DollarSign,
  ShieldCheck,
  UserPlus,
  ThumbsUp,
  X,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { mockUserProfiles } from "@/mock/user-profiles"
import { mockTradeData } from "@/mock/map-data"

// Comprehensive mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "trade_proposal",
    title: "New Trade Proposal",
    message: "Alex Johnson has proposed a trade for your Vintage Record Collection",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
    data: {
      tradeId: "123",
      userId: 101,
      itemId: 2,
    },
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "Sarah Miller: Hi, is the mechanical keyboard still available?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 2 hours ago
    isRead: false,
    data: {
      conversationId: "456",
      userId: 102,
      messagePreview: "Hi, is the mechanical keyboard still available?",
    },
  },
  {
    id: 3,
    type: "trade_accepted",
    title: "Trade Accepted",
    message: "Michael Chen accepted your trade offer for the Professional Camera Kit",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    isRead: true,
    data: {
      tradeId: "789",
      userId: 103,
      itemId: 3,
    },
  },
  {
    id: 4,
    type: "review",
    title: "New Review",
    message: "Emily Rodriguez left you a 5-star review for your recent trade",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
    data: {
      reviewId: "101",
      userId: 104,
      rating: 5,
    },
  },
  {
    id: 5,
    type: "meetup",
    title: "Trade Meetup Reminder",
    message: "Your meetup with David Kim for Mountain Bike is tomorrow at 2:00 PM",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    isRead: true,
    data: {
      meetupId: "202",
      userId: 105,
      itemId: 5,
      meetupTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // tomorrow
      location: "Central Park, NY",
    },
  },
  {
    id: 6,
    type: "trade_declined",
    title: "Trade Declined",
    message: "Jessica Taylor declined your trade offer for the Vintage Leather Jacket",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    isRead: true,
    data: {
      tradeId: "303",
      userId: 106,
      itemId: 6,
    },
  },
  {
    id: 7,
    type: "badge_earned",
    title: "New Badge Earned",
    message: "Congratulations! You've earned the 'Trusted Trader' badge",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    isRead: true,
    data: {
      badgeId: "trusted_trader",
      badgeName: "Trusted Trader",
      badgeDescription: "Complete 10 successful trades with 5-star ratings",
    },
  },
  {
    id: 8,
    type: "item_interest",
    title: "Item Interest",
    message: "5 people have shown interest in your Gaming Console Bundle",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    isRead: true,
    data: {
      itemId: 7,
      interestCount: 5,
    },
  },
  {
    id: 9,
    type: "verification",
    title: "Account Verified",
    message: "Your account has been successfully verified. Enjoy full access to NeoTradez!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
    isRead: true,
    data: {
      verificationId: "v123456",
    },
  },
  {
    id: 10,
    type: "meetup_changed",
    title: "Meetup Rescheduled",
    message: "Olivia Brown has rescheduled your meetup for the Antique Pocket Watch",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(), // 6 days ago
    isRead: true,
    data: {
      meetupId: "404",
      userId: 108,
      itemId: 8,
      oldTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      newTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    },
  },
  {
    id: 11,
    type: "trade_completed",
    title: "Trade Completed",
    message: "Your trade with James Martinez for the Professional Tool Set has been marked as completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(), // 7 days ago
    isRead: true,
    data: {
      tradeId: "505",
      userId: 109,
      itemId: 9,
    },
  },
  {
    id: 13,
    type: "friend_request",
    title: "New Friend Request",
    message: "Daniel Garcia wants to connect with you on NeoTradez",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 216).toISOString(), // 9 days ago
    isRead: true,
    data: {
      requestId: "fr123456",
      userId: 111,
    },
  },
  {
    id: 14,
    type: "item_alert",
    title: "Item Alert",
    message: "A new Espresso Machine matching your saved search is now available",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString(), // 10 days ago
    isRead: true,
    data: {
      searchId: "s123456",
      itemId: 12,
    },
  },
  {
    id: 15,
    type: "system",
    title: "System Maintenance",
    message: "NeoTradez will be undergoing maintenance tonight from 2 AM to 4 AM EST",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 264).toISOString(), // 11 days ago
    isRead: true,
    data: {
      maintenanceId: "m123456",
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    },
  },
  {
    id: 16,
    type: "dispute_resolution",
    title: "Dispute Resolved",
    message: "The dispute regarding your trade with Marcus Johnson has been resolved in your favor",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 288).toISOString(), // 12 days ago
    isRead: true,
    data: {
      disputeId: "d123456",
      userId: 113,
      tradeId: "606",
      resolution: "in_favor",
    },
  },
]

export function NotificationsList() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadNotifications = notifications.filter((n) => !n.isRead)
  const readNotifications = notifications.filter((n) => n.isRead)

  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  // Update the handleNotificationClick function to properly route to the correct pages
  const handleNotificationClick = (notification: any) => {
    // Don't navigate for system maintenance notifications
    if (notification.type === "system") {
      markNotificationAsRead(notification.id)
      return
    }

    markNotificationAsRead(notification.id)

    // Route based on notification type
    switch (notification.type) {
      case "trade_proposal":
        router.push(`/my-trades/${notification.data.tradeId}`)
        break
      case "message":
        router.push(`/messages?user=${getUserProfile(notification.data.userId)?.name.toLowerCase().replace(" ", "-")}`)
        break
      case "trade_accepted":
        router.push(`/my-trades/${notification.data.tradeId}`)
        break
      case "review":
        router.push(`/reviews`)
        break
      case "meetup":
        router.push(`/trade-meetup`)
        break
      case "trade_declined":
        router.push(`/my-trades`)
        break
      case "badge_earned":
        router.push(`/badges`)
        break
      case "item_interest":
        router.push(`/marketplace/${notification.data.itemId}`)
        break
      case "verification":
        router.push(`/profile`)
        break
      case "meetup_changed":
        router.push(`/trade-meetup`)
        break
      case "trade_completed":
        router.push(`/my-trades`)
        break
      case "payment":
        router.push(`/settings`)
        break
      case "friend_request":
        router.push(`/network`)
        break
      case "item_alert":
        router.push(`/marketplace`)
        break
      case "dispute_resolution":
        router.push(`/disputes`)
        break
      default:
        router.push(`/notifications`)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "trade_proposal":
        return <ArrowLeftRight className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "trade_accepted":
        return <Check className="h-5 w-5 text-purple-500" />
      case "review":
        return <Star className="h-5 w-5 text-amber-500" />
      case "meetup":
        return <Calendar className="h-5 w-5 text-red-500" />
      case "trade_declined":
        return <X className="h-5 w-5 text-rose-500" />
      case "badge_earned":
        return <Award className="h-5 w-5 text-amber-500" />
      case "item_interest":
        return <ThumbsUp className="h-5 w-5 text-blue-500" />
      case "verification":
        return <ShieldCheck className="h-5 w-5 text-green-500" />
      case "meetup_changed":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "trade_completed":
        return <CheckCheck className="h-5 w-5 text-green-500" />
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "friend_request":
        return <UserPlus className="h-5 w-5 text-blue-500" />
      case "item_alert":
        return <Bell className="h-5 w-5 text-purple-500" />
      case "system":
        return <Settings className="h-5 w-5 text-gray-500" />
      case "dispute_resolution":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Get user profile data for notifications
  const getUserProfile = (userId: number) => {
    return mockUserProfiles.find((profile) => profile.id === userId)
  }

  // Get item data for notifications
  const getItemData = (itemId: number) => {
    return mockTradeData.find((item) => item.id === itemId)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllNotificationsAsRead}
          disabled={unreadNotifications.length === 0}
        >
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="mb-3 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No notifications yet</h3>
              <p className="text-sm text-muted-foreground">When you receive notifications, they will appear here</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`${notification.type !== "system" ? "cursor-pointer" : ""} transition-colors hover:bg-muted/50 ${
                    !notification.isRead ? "border-l-4 border-l-primary" : ""
                  }`}
                  onClick={
                    notification.type !== "system"
                      ? () => handleNotificationClick(notification)
                      : () => markNotificationAsRead(notification.id)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.isRead && (
                            <Badge variant="default" className="ml-2">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-4 space-y-3">
          {unreadNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCheck className="mb-3 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">All caught up!</h3>
              <p className="text-sm text-muted-foreground">You have no unread notifications</p>
            </div>
          ) : (
            unreadNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`${notification.type !== "system" ? "cursor-pointer" : ""} border-l-4 border-l-primary transition-colors hover:bg-muted/50`}
                  onClick={
                    notification.type !== "system"
                      ? () => handleNotificationClick(notification)
                      : () => markNotificationAsRead(notification.id)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <Badge variant="default" className="ml-2">
                            New
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="read" className="mt-4 space-y-3">
          {readNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="mb-3 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No read notifications</h3>
              <p className="text-sm text-muted-foreground">Notifications you've seen will appear here</p>
            </div>
          ) : (
            readNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`${notification.type !== "system" ? "cursor-pointer" : ""} transition-colors hover:bg-muted/50`}
                  onClick={notification.type !== "system" ? () => handleNotificationClick(notification) : undefined}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-center">
        <Link href="/settings">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Notification Settings
          </Button>
        </Link>
      </div>
    </div>
  )
}
