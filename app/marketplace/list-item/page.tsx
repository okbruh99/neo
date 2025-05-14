"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Package, MapPin, Plus, X, Save } from "lucide-react"
import Link from "next/link"

// Mock inventory data
const inventoryItems = [
  {
    id: "inv-1",
    name: "Vintage Camera",
    description: "Nikon F3 in excellent condition",
    category: "Electronics",
    condition: "Excellent",
    image: "/placeholder.svg?height=100&width=100",
    value: "$250",
  },
  {
    id: "inv-2",
    name: "Mechanical Keyboard",
    description: "Custom built with Cherry MX switches",
    category: "Electronics",
    condition: "Like New",
    image: "/placeholder.svg?height=100&width=100",
    value: "$120",
  },
  {
    id: "inv-3",
    name: "Film Camera Lens",
    description: "50mm f/1.4 manual focus lens",
    category: "Photography",
    condition: "Good",
    image: "/placeholder.svg?height=100&width=100",
    value: "$180",
  },
  {
    id: "inv-4",
    name: "Vintage Record Player",
    description: "1970s turntable, recently serviced",
    category: "Audio",
    condition: "Fair",
    image: "/placeholder.svg?height=100&width=100",
    value: "$200",
  },
]

export default function ListItemPage() {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    tradeFor: "",
    location: "",
    latitude: 37.7749,
    longitude: -122.4194,
    showExactLocation: false,
    images: ["/placeholder.svg?height=300&width=300"],
    estimatedValue: "",
  })
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)
  const [step, setStep] = useState(1)
  const [generatedId, setGeneratedId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load Google Maps API
  useEffect(() => {
    // This would normally load the Google Maps API
    // For this example, we'll just simulate it
    const timer = setTimeout(() => {
      setMapLoaded(true)
      // In a real implementation, you would initialize the map here
      // after the API has loaded
      initializeMap()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Initialize map
  const initializeMap = () => {
    if (mapRef.current) {
      // This is a placeholder for actual Google Maps initialization
      console.log("Map would be initialized here")
      // In a real implementation, you would create the map and marker here

      // For demonstration purposes, let's just show a placeholder
      const mapPlaceholder = document.createElement("img")
      mapPlaceholder.src = `/placeholder.svg?height=300&width=600&text=Map+Location+(${formData.latitude},${formData.longitude})`
      mapPlaceholder.className = "w-full h-[300px] object-cover rounded-lg"

      // Clear any existing content
      while (mapRef.current.firstChild) {
        mapRef.current.removeChild(mapRef.current.firstChild)
      }

      mapRef.current.appendChild(mapPlaceholder)
    }
  }

  // Update map when location changes
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      initializeMap()
    }
  }, [formData.latitude, formData.longitude, mapLoaded])

  // Handle inventory item selection
  const handleInventorySelect = (itemId: string) => {
    setSelectedInventoryItem(itemId)
    const item = inventoryItems.find((item) => item.id === itemId)
    if (item) {
      setFormData({
        ...formData,
        title: item.name,
        description: item.description,
        category: item.category,
        condition: item.condition,
        images: [item.image],
        estimatedValue: item.value.replace("$", ""),
      })
    }
  }

  // Handle location change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, location: e.target.value })

    // In a real app, you would geocode the address to get coordinates
    // For this example, we'll just use random coordinates near San Francisco
    const lat = 37.7749 + (Math.random() - 0.5) * 0.1
    const lng = -122.4194 + (Math.random() - 0.5) * 0.1

    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
  }

  // Handle image upload
  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, `/placeholder.svg?height=300&width=300&text=Image+${prev.images.length + 1}`],
    }))
  }

  const handleRemoveImage = (index: number) => {
    if (formData.images.length > 1) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Generate a random ID for the new listing
    const newId = `item-${Math.floor(Math.random() * 10000)}`
    setGeneratedId(newId)

    // In a real app, you would save the data to your backend here
    console.log("Form submitted:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to the item page
    router.push(`/marketplace/${newId}`)
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-6">
        <Link href="/marketplace" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">List an Item for Trade</h1>

      {step === 1 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Select from Your Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Choose an item from your inventory or create a new listing from scratch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {inventoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedInventoryItem === item.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => handleInventorySelect(item.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="flex items-center mt-2 text-xs">
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full mr-2">
                          {item.category}
                        </span>
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          {item.condition}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedInventoryItem(null)}>
                Create New Listing
              </Button>
              <Button onClick={() => setStep(2)} disabled={!selectedInventoryItem}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="relative aspect-square overflow-hidden rounded-lg border">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Item image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {formData.images.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {formData.images.length < 4 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="aspect-square flex flex-col items-center justify-center rounded-lg border border-dashed"
                        onClick={handleAddImage}
                      >
                        <Plus className="mb-1 h-6 w-6" />
                        <span className="text-xs">Add Image</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                          <SelectItem value="Collectibles">Collectibles</SelectItem>
                          <SelectItem value="Photography">Photography</SelectItem>
                          <SelectItem value="Audio">Audio</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => setFormData({ ...formData, condition: value })}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tradeFor">What You're Looking to Trade For</Label>
                    <Textarea
                      id="tradeFor"
                      rows={2}
                      value={formData.tradeFor}
                      onChange={(e) => setFormData({ ...formData, tradeFor: e.target.value })}
                      placeholder="Describe what you're interested in trading this item for"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Meeting Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={handleLocationChange}
                        className="pl-10"
                        placeholder="Enter a neighborhood, area, or address"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showExactLocation">Show exact location on map</Label>
                      <Switch
                        id="showExactLocation"
                        checked={formData.showExactLocation}
                        onCheckedChange={(checked) => setFormData({ ...formData, showExactLocation: checked })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      If turned off, only the general area will be shown to other users
                    </p>
                  </div>

                  <div ref={mapRef} className="h-[300px] w-full rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p>Map loading...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? "Listing..." : "List Item"}
              {!isLoading && <Save className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
