"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Archive, Flag, MessageSquare, PlusCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { mockChats, mockMessages } from "@/mock/messages-data"
import { useToast } from "@/hooks/use-toast"

export function MessagesHeader() {
  const router = useRouter()

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with other traders</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2" onClick={() => router.push("/messages/archived")}>
          <Archive className="h-4 w-4" />
          Archived
        </Button>
        <Button className="gap-2" onClick={() => router.push("/messages/new")}>
          <PlusCircle className="h-4 w-4" />
          New Message
        </Button>
      </div>
    </div>
  )
}

export function MessagesLayout() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [imageAttachment, setImageAttachment] = useState(null)

  useEffect(() => {
    // Load messages for selected chat
    if (activeConversation) {
      const chatMessages = mockMessages.filter((msg) => msg.chatId === activeConversation.id)
      setMessages(chatMessages)
    }
  }, [activeConversation])

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation)
    // Update URL without full navigation
    router.push(`/messages?id=${conversation.id}`, undefined, { shallow: true })
  }

  const handleReportMessage = (id) => {
    toast({
      title: "Reported Message",
      description: `You have reported message ${id}.`,
    })
  }

  const handleArchiveConversation = (id) => {
    toast({
      title: "Archived Conversation",
      description: `You have archived conversation ${id}.`,
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputValue.trim() === "" && !imageAttachment) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      chatId: activeConversation.id,
      sender: "me",
      text: inputValue.trim(),
      time: new Date().toISOString(),
      image: imageAttachment,
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setImageAttachment(null)
  }

  const handleAttachImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImageAttachment(imageUrl)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Conversations list */}
      <div className="md:col-span-1">
        {/* Conversations list content */}
        {mockChats.map((conversation) => (
          <div
            key={conversation.id}
            className={`cursor-pointer rounded-lg p-3 transition-colors ${
              activeConversation?.id === conversation.id ? "bg-muted" : "hover:bg-muted/50"
            }`}
            onClick={() => handleConversationClick(conversation)}
          >
            {/* Conversation item content */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{conversation.name}</h3>
                <p className="text-xs text-muted-foreground">Last active {conversation.lastMessageTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active conversation */}
      <div className="md:col-span-2">
        {activeConversation ? (
          <div className="rounded-lg border">
            {/* Conversation header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation.name}</h3>
                  <p className="text-xs text-muted-foreground">Last active {activeConversation.lastMessageTime}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => router.push(`/user/${activeConversation.user.id}`)}>
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleReportMessage(activeConversation.id)}>
                  <Flag className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleArchiveConversation(activeConversation.id)}>
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.image && (
                      <img
                        src={message.image || "/placeholder.svg"}
                        alt="Attachment"
                        className="mt-2 max-h-48 rounded-md object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="border-t p-4">
              <form className="flex gap-2" onSubmit={handleSendMessage}>
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload"
                  onChange={handleAttachImage}
                />
                <Button variant="outline" onClick={() => document.getElementById("image-upload").click()}>
                  Attach Image
                </Button>
                <Button type="submit">Send</Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex h-[500px] flex-col items-center justify-center rounded-lg border">
            <MessageSquare className="mb-2 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No conversation selected</h3>
            <p className="text-muted-foreground">Select a conversation from the list to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80"></header>
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <MessagesHeader />
        <MessagesLayout />
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
