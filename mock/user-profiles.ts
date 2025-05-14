// Mock user profiles data
export const mockUserProfiles = [
  {
    id: 101,
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=200&width=200&text=AJ",
    bio: "Tech enthusiast and photography hobbyist. I love trading gadgets and camera equipment. Always looking for vintage lenses and unique tech accessories.",
    location: "New York, NY",
    memberSince: "Jan 2023",
    completedTrades: 47,
    rating: 4.8,
    reviewCount: 38,
    responseTime: "< 1 hour",
    trustScore: 98,
    verified: true,
    badges: [
      {
        name: "Top Trader",
        description: "Completed over 25 successful trades",
        icon: "star",
        color: "rgba(245, 158, 11, 0.8)",
      },
      {
        name: "Quick Responder",
        description: "Responds to messages within an hour",
        icon: "check",
        color: "rgba(16, 185, 129, 0.8)",
      },
      {
        name: "Verified User",
        description: "Identity verified by NeoTradez",
        icon: "shield",
        color: "rgba(59, 130, 246, 0.8)",
      },
    ],
    reviews: [
      {
        reviewer: {
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=50&width=50&text=ER",
        },
        rating: 5,
        date: "March 15, 2025",
        comment:
          "Alex was great to trade with! The MacBook was in perfect condition as described. Very responsive and made the exchange process smooth.",
        tradeItem: "MacBook Pro 2021",
      },
      {
        reviewer: {
          name: "David Kim",
          avatar: "/placeholder.svg?height=50&width=50&text=DK",
        },
        rating: 5,
        date: "February 2, 2025",
        comment:
          "Excellent trader. Item was exactly as described and Alex was very accommodating with meeting time and location.",
        tradeItem: "Canon EOS Camera",
      },
      {
        reviewer: {
          name: "Sarah Miller",
          avatar: "/placeholder.svg?height=50&width=50&text=SM",
        },
        rating: 4,
        date: "January 10, 2025",
        comment:
          "Good experience overall. The iPad had a few more scratches than I expected, but Alex was honest about it and we made a fair trade.",
        tradeItem: "iPad Pro",
      },
    ],
  },
  {
    id: 102,
    name: "Sarah Miller",
    username: "sarahm",
    email: "sarah.miller@example.com",
    avatar: "/placeholder.svg?height=200&width=200&text=SM",
    bio: "Music lover and vinyl collector. I enjoy finding rare records and trading with fellow enthusiasts. Also interested in vintage audio equipment and music memorabilia.",
    location: "Brooklyn, NY",
    memberSince: "Mar 2023",
    completedTrades: 32,
    rating: 4.5,
    reviewCount: 25,
    responseTime: "2 hours",
    trustScore: 92,
    verified: true,
    badges: [
      {
        name: "Music Expert",
        description: "Specialized in music-related trades",
        icon: "star",
        color: "rgba(245, 158, 11, 0.8)",
      },
      {
        name: "Reliable Trader",
        description: "Completed all scheduled trades",
        icon: "check",
        color: "rgba(16, 185, 129, 0.8)",
      },
    ],
    reviews: [
      {
        reviewer: {
          name: "Marcus Johnson",
          avatar: "/placeholder.svg?height=50&width=50&text=MJ",
        },
        rating: 5,
        date: "April 5, 2025",
        comment:
          "Sarah's vinyl collection was amazing! She was knowledgeable and helped me find exactly what I was looking for. Great trade experience.",
        tradeItem: "Vintage Record Collection",
      },
      {
        reviewer: {
          name: "Tyler Scott",
          avatar: "/placeholder.svg?height=50&width=50&text=TS",
        },
        rating: 4,
        date: "March 22, 2025",
        comment: "Good trader. Records were in the condition described. Would trade with again.",
        tradeItem: "Jazz Records",
      },
    ],
  },
  {
    id: 103,
    name: "Michael Chen",
    username: "mikec",
    email: "michael.chen@example.com",
    avatar: "/placeholder.svg?height=200&width=200&text=MC",
    bio: "Professional photographer and tech enthusiast. I specialize in camera equipment trades and photography accessories. Always looking for unique gear to add to my collection.",
    location: "Manhattan, NY",
    memberSince: "Nov 2022",
    completedTrades: 63,
    rating: 4.9,
    reviewCount: 57,
    responseTime: "< 30 mins",
    trustScore: 99,
    verified: true,
    badges: [
      {
        name: "Elite Trader",
        description: "Completed over 50 successful trades",
        icon: "star",
        color: "rgba(245, 158, 11, 0.8)",
      },
      {
        name: "Photography Pro",
        description: "Expert in photography equipment",
        icon: "check",
        color: "rgba(16, 185, 129, 0.8)",
      },
      {
        name: "Verified User",
        description: "Identity verified by NeoTradez",
        icon: "shield",
        color: "rgba(59, 130, 246, 0.8)",
      },
      {
        name: "Top Rated",
        description: "Maintained 4.8+ rating for 6 months",
        icon: "star",
        color: "rgba(236, 72, 153, 0.8)",
      },
    ],
    reviews: [
      {
        reviewer: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=50&width=50&text=AJ",
        },
        rating: 5,
        date: "April 18, 2025",
        comment:
          "Michael is the best trader I've met on this platform. The camera kit was immaculate and he even included some extra accessories. Highly recommend!",
        tradeItem: "Professional Camera Kit",
      },
      {
        reviewer: {
          name: "Olivia Brown",
          avatar: "/placeholder.svg?height=50&width=50&text=OB",
        },
        rating: 5,
        date: "April 2, 2025",
        comment:
          "Excellent experience trading with Michael. He's knowledgeable, professional, and the equipment was in perfect condition.",
        tradeItem: "Camera Lenses",
      },
      {
        reviewer: {
          name: "Daniel Garcia",
          avatar: "/placeholder.svg?height=50&width=50&text=DG",
        },
        rating: 5,
        date: "March 15, 2025",
        comment:
          "Great trader! Michael was punctual, friendly, and the drone was exactly as described. Would definitely trade with him again.",
        tradeItem: "Drone",
      },
    ],
  },
  {
    id: 104,
    name: "Emily Rodriguez",
    username: "emilyr",
    email: "emily.rodriguez@example.com",
    avatar: "/placeholder.svg?height=200&width=200&text=ER",
    bio: "Interior design enthusiast with a passion for mid-century modern furniture. I love finding unique pieces and helping others style their spaces through trading.",
    location: "Chelsea, NY",
    memberSince: "Feb 2023",
    completedTrades: 28,
    rating: 4.7,
    reviewCount: 22,
    responseTime: "1 hour",
    trustScore: 95,
    verified: true,
    badges: [
      {
        name: "Design Expert",
        description: "Specialized in furniture and decor",
        icon: "star",
        color: "rgba(245, 158, 11, 0.8)",
      },
      {
        name: "Verified User",
        description: "Identity verified by NeoTradez",
        icon: "shield",
        color: "rgba(59, 130, 246, 0.8)",
      },
    ],
    reviews: [
      {
        reviewer: {
          name: "Natalie Wong",
          avatar: "/placeholder.svg?height=50&width=50&text=NW",
        },
        rating: 5,
        date: "April 10, 2025",
        comment:
          "Emily has an amazing eye for furniture! The sofa was in perfect condition and looks even better in person. Very happy with our trade.",
        tradeItem: "Mid-Century Modern Sofa",
      },
      {
        reviewer: {
          name: "James Martinez",
          avatar: "/placeholder.svg?height=50&width=50&text=JM",
        },
        rating: 4,
        date: "March 5, 2025",
        comment:
          "Good experience trading with Emily. The coffee table had a small scratch not mentioned in the description, but she was upfront about it when we met and offered a fair adjustment.",
        tradeItem: "Coffee Table",
      },
    ],
  },
  {
    id: 105,
    name: "David Kim",
    username: "davidk",
    email: "david.kim@example.com",
    avatar: "/placeholder.svg?height=200&width=200&text=DK",
    bio: "Outdoor enthusiast and cycling fanatic. I trade sports equipment, camping gear, and bikes. Always looking for new adventures and gear to help me explore.",
    location: "Upper West Side, NY",
    memberSince: "Apr 2023",
    completedTrades: 19,
    rating: 4.6,
    reviewCount: 15,
    responseTime: "3 hours",
    trustScore: 90,
    verified: true,
    badges: [
      {
        name: "Sports Expert",
        description: "Specialized in sports equipment",
        icon: "star",
        color: "rgba(245, 158, 11, 0.8)",
      },
    ],
    reviews: [
      {
        reviewer: {
          name: "Ryan Wilson",
          avatar: "/placeholder.svg?height=50&width=50&text=RW",
        },
        rating: 5,
        date: "April 15, 2025",
        comment:
          "David was great to trade with! The mountain bike was well-maintained and exactly as described. He even gave me some tips on local trails.",
        tradeItem: "Mountain Bike",
      },
      {
        reviewer: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=50&width=50&text=AJ",
        },
        rating: 4,
        date: "March 28, 2025",
        comment:
          "Good trade experience. David was a bit late to our meeting, but the camping gear was in excellent condition and worth the wait.",
        tradeItem: "Camping Gear",
      },
    ],
  },
]
