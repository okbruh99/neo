"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

type SearchResult = {
  id: string
  type: "item" | "user" | "trade" | "location"
  title: string
  description?: string
  image?: string
  url: string
}

type Item = {
  id: string
  name: string
  category: string
  image: string
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([]) // Replace 'any' with your actual type
  const [recommendedItems, setRecommendedItems] = useState<Item[]>([
    { id: "rec1", name: "Recommended Item 1", category: "Category A", image: "/placeholder.svg?height=40&width=40" },
    { id: "rec2", name: "Recommended Item 2", category: "Category B", image: "/placeholder.svg?height=40&width=40" },
    { id: "rec3", name: "Recommended Item 3", category: "Category C", image: "/placeholder.svg?height=40&width=40" },
    { id: "rec4", name: "Recommended Item 4", category: "Category A", image: "/placeholder.svg?height=40&width=40" },
    { id: "rec5", name: "Recommended Item 5", category: "Category B", image: "/placeholder.svg?height=40&width=40" },
    { id: "rec6", name: "Recommended Item 6", category: "Category C", image: "/placeholder.svg?height=40&width=40" },
  ])
  const [trendingItems, setTrendingItems] = useState<Item[]>([
    { id: "trend1", name: "Trending Item 1", category: "Category X", image: "/placeholder.svg?height=40&width=40" },
    { id: "trend2", name: "Trending Item 2", category: "Category Y", image: "/placeholder.svg?height=40&width=40" },
    { id: "trend3", name: "Trending Item 3", category: "Category Z", image: "/placeholder.svg?height=40&width=40" },
    { id: "trend4", name: "Trending Item 4", category: "Category X", image: "/placeholder.svg?height=40&width=40" },
    { id: "trend5", name: "Trending Item 5", category: "Category Y", image: "/placeholder.svg?height=40&width=40" },
    { id: "trend6", name: "Trending Item 6", category: "Category Z", image: "/placeholder.svg?height=40&width=40" },
  ])

  // Mock search results
  useEffect(() => {
    if (query.length > 1) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: "1",
            type: "item",
            title: "Vintage Camera",
            description: "Nikon F3 in excellent condition",
            image: "/placeholder.svg?height=40&width=40",
            url: "/marketplace/1",
          },
          {
            id: "2",
            type: "user",
            title: "PhotoEnthusiast",
            description: "Rating: 4.8 ★",
            image: "/placeholder.svg?height=40&width=40",
            url: "/user/2",
          },
          {
            id: "3",
            type: "trade",
            title: "Camera for Laptop",
            description: "Status: Pending",
            url: "/my-trades/3",
          },
          {
            id: "4",
            type: "location",
            title: "Central Park",
            description: "Popular meetup location",
            url: "/map?location=central-park",
          },
        ].filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase()),
        )

        setResults(mockResults)
        setLoading(false)
      }, 500)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    router.push(result.url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Search...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Search NeoTradez</DialogTitle>
        </DialogHeader>
        <Command className="overflow-hidden rounded-t-none border-t">
          <CommandInput
            placeholder="Search for items, users, trades..."
            value={query}
            onValueChange={setQuery}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{loading ? "Searching..." : "No results found."}</CommandEmpty>
            {results.length > 0 && (
              <CommandGroup heading="Results">
                {results.map((result) => (
                  <CommandItem
                    key={result.id}
                    onSelect={() => handleSelect(result)}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    {result.image && (
                      <div className="h-10 w-10 overflow-hidden rounded-md">
                        <img
                          src={result.image || "/placeholder.svg"}
                          alt={result.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{result.title}</span>
                      {result.description && (
                        <span className="text-xs text-muted-foreground">{result.description}</span>
                      )}
                      <span className="text-xs text-muted-foreground capitalize">{result.type}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg p-2 max-h-[400px] overflow-y-auto">
          {/* Recommended Items */}
          <div className="mb-3">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Top Recommended Items</h3>
            <div className="space-y-1">
              {recommendedItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                  onClick={() => {
                    router.push(`/marketplace/${item.id}`)
                    setSearchQuery("")
                  }}
                >
                  <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Items */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Top Trending Items</h3>
            <div className="space-y-1">
              {trendingItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                  onClick={() => {
                    router.push(`/marketplace/${item.id}`)
                    setSearchQuery("")
                  }}
                >
                  <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
