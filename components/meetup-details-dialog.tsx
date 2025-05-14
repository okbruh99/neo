"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Pencil, X, CheckCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CancelTradeDialog } from "@/components/cancel-trade-dialog"
import { RescheduleMeetupDialog } from "@/components/reschedule-meetup-dialog"
import { MeetupCompleteDialog } from "@/components/meetup-complete-dialog"

interface MeetupDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  meetup: any // In a real app, this would be properly typed
}

export function MeetupDetailsDialog({ open, onOpenChange, meetup }: MeetupDetailsDialogProps) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false)
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false)
  const router = useRouter()

  if (!meetup) return null

  const formattedDate = new Date(meetup.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const formattedTime =
    typeof meetup.timeRange === "string"
      ? meetup.timeRange
      : new Date(meetup.date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })

  const handleMessageClick = () => {
    router.push(`/messages/${meetup.trader.id || meetup.with?.id || meetup.from?.id}`)
    onOpenChange(false)
  }

  const handleViewOnMap = () => {
    // In a real app, this would navigate to a map view with the location pinned
    router.push(`/map?location=${encodeURIComponent(meetup.location)}`)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Meetup Details</span>
              <Badge
                className={
                  meetup.status === "confirmed"
                    ? "bg-green-500"
                    : meetup.status === "pending"
                      ? "bg-yellow-500"
                      : meetup.status === "completed"
                        ? "bg-blue-500"
                        : "bg-red-500"
                }
              >
                {meetup.status?.charAt(0).toUpperCase() + meetup.status?.slice(1) || "Unknown"}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Reference: {meetup.referenceNumber || `NT${Math.random().toString(36).substring(2, 8).toUpperCase()}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Trade Items */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">You're offering:</h3>
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={meetup.yourItem?.image || meetup.offering?.image || "/placeholder.svg"}
                      alt={meetup.yourItem?.title || meetup.offering?.title || "Your item"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{meetup.yourItem?.title || meetup.offering?.title || "Your item"}</p>
                    <p className="text-xs text-muted-foreground">
                      Value: {meetup.yourItem?.value || meetup.offering?.value || "$0"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Item #:{" "}
                      {meetup.yourItem?.id ||
                        meetup.offering?.id ||
                        "NT" + Math.random().toString(36).substring(2, 8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">You're receiving:</h3>
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={meetup.theirItem?.image || meetup.requesting?.image || "/placeholder.svg"}
                      alt={meetup.theirItem?.title || meetup.requesting?.title || "Their item"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{meetup.theirItem?.title || meetup.requesting?.title || "Their item"}</p>
                    <p className="text-xs text-muted-foreground">
                      Value: {meetup.theirItem?.value || meetup.requesting?.value || "$0"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Item #:{" "}
                      {meetup.theirItem?.id ||
                        meetup.requesting?.id ||
                        "NT" + Math.random().toString(36).substring(2, 8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trader Info */}
            <div className="flex items-center gap-4 rounded-md border p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={meetup.trader?.avatar || meetup.with?.avatar || meetup.from?.avatar || "/placeholder.svg"}
                  alt={meetup.trader?.name || meetup.with?.name || meetup.from?.name || "Trader"}
                />
                <AvatarFallback>
                  {(meetup.trader?.name || meetup.with?.name || meetup.from?.name || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {meetup.trader?.name || meetup.with?.name || meetup.from?.name || "Unknown Trader"}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-1">Rating:</span>
                  <span className="flex items-center">
                    {meetup.trader?.rating || meetup.with?.rating || meetup.from?.rating || "4.5"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-3 w-3 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <Button variant="link" className="h-auto p-0 text-sm" onClick={handleMessageClick}>
                  Message Trader
                </Button>
              </div>
            </div>

            {/* Meetup Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Meetup Information</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-md border p-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-md border p-3">
                  <Clock className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{formattedTime}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-md border p-3">
                <MapPin className="mt-0.5 h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Location</p>
                    <Button variant="ghost" size="sm" className="h-8" onClick={handleViewOnMap}>
                      View on map
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {meetup.location || meetup.meetup?.location?.name || "Meeting location"}
                  </p>
                  {meetup.meetup?.location?.address && (
                    <p className="text-xs text-muted-foreground">{meetup.meetup.location.address}</p>
                  )}
                </div>
              </div>

              {(meetup.meetup?.notes || meetup.notes) && (
                <div className="rounded-md border p-3">
                  <p className="font-medium">Additional Notes</p>
                  <p className="text-sm text-muted-foreground">{meetup.meetup?.notes || meetup.notes}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            {meetup.status === "confirmed" && (
              <>
                <Button variant="outline" className="gap-2" onClick={() => setCancelDialogOpen(true)}>
                  <X className="h-4 w-4" />
                  Cancel Meetup
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setRescheduleDialogOpen(true)}>
                  <Pencil className="h-4 w-4" />
                  Reschedule
                </Button>
                <Button
                  className="gap-2 bg-[#00D084] hover:bg-[#00D084]/90"
                  onClick={() => setCompleteDialogOpen(true)}
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Complete
                </Button>
              </>
            )}

            {meetup.status === "pending" && (
              <>
                <Button variant="outline" className="gap-2" onClick={() => setCancelDialogOpen(true)}>
                  <X className="h-4 w-4" />
                  Decline
                </Button>
                <Button className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Confirm
                </Button>
              </>
            )}

            {meetup.status === "completed" && (
              <Button variant="outline" className="gap-2" onClick={() => router.push(`/reviews/submit/${meetup.id}`)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                Leave Review
              </Button>
            )}

            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Additional dialogs */}
      <CancelTradeDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        tradeId={meetup.id}
        tradeType="meetup"
      />

      <RescheduleMeetupDialog
        open={rescheduleDialogOpen}
        onOpenChange={setRescheduleDialogOpen}
        tradeId={meetup.id}
        currentDate={new Date(meetup.date)}
        currentTime={formattedTime}
        traderId={meetup.trader?.id || meetup.with?.id || meetup.from?.id}
        traderName={meetup.trader?.name || meetup.with?.name || meetup.from?.name || "Trader"}
      />

      <MeetupCompleteDialog
        open={completeDialogOpen}
        onOpenChange={setCompleteDialogOpen}
        tradeId={meetup.id}
        traderId={meetup.trader?.id || meetup.with?.id || meetup.from?.id}
        traderName={meetup.trader?.name || meetup.with?.name || meetup.from?.name || "Trader"}
      />
    </>
  )
}
