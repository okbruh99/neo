"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { PageInfoAlert } from "@/components/page-info-alert"
import { useMarketplace } from "@/context/marketplace-context"
import { Loader2, Search, AlertCircle, BookmarkIcon, MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export function MarketplaceGrid() {
  const router = useRouter()
  const { filteredItems: items, loading, error, loadMore, hasMore, savedItems, saveItem, filters } = useMarketplace()

  const handleSaveItem = (itemId) => {
    saveItem(itemId)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  // Render empty state when no items match filters
  if (items.length === 0 && !loading && !error) {
    return (
      <div className="py-8">
        <PageInfoAlert
          title="Marketplace"
          description="Browse items available for trade. Each item has a unique reference number for easy tracking."
        />

        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
          <div className="mb-4 rounded-full bg-muted/50 p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No items found</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            {filters.search
              ? `No items match your search for "${filters.search}". Try adjusting your filters or search terms.`
              : "No items match your current filters. Try adjusting your filters or check back later."}
          </p>
          <Button
            onClick={() => router.push("/marketplace/list-item")}
            className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
          >
            <span className="relative z-10">List an Item</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Button onClick={() => window.location.reload()} variant="outline" className="mx-auto block">
          Refresh Page
        </Button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <PageInfoAlert
        title="Marketplace"
        description="Browse items available for trade. Each item has a unique reference number for easy tracking."
      />

      <AnimatePresence>
        {loading && items.length === 0 ? (
          <motion.div
            className="flex h-64 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading items...</span>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => (
              <Link
                href={`/marketplace/${item.id}`}
                key={item.id}
                className="block transition-transform hover:scale-[1.03] duration-300"
              >
                <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-sm hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {item.featured && (
                      <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        Featured
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleSaveItem(item.id)
                      }}
                    >
                      {savedItems && savedItems.has && savedItems.has(item.id) ? (
                        <BookmarkIcon className="h-4 w-4 fill-primary text-primary" />
                      ) : (
                        <BookmarkIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <Badge variant="outline">{item.condition}</Badge>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/user/${item.owner.id}`)
                        }}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.owner.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground hover:text-foreground">{item.owner.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Button onClick={loadMore} variant="outline" className="gap-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Items"
            )}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
