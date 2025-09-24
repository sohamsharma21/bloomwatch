"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Users, BookOpen, Share2, Heart, Reply, TrendingUp, Award } from "lucide-react"

export function CommunityPlatform() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [newPost, setNewPost] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null)

  const discussions = [
    { 
      id: 1,
      title: "Spring Bloom Patterns in Northern Hemisphere", 
      author: "Dr. Sarah Chen", 
      replies: 12,
      likes: 45,
      time: "2 hours ago",
      tags: ["Research", "Spring", "Climate"],
      content: "Recent observations show earlier blooming times across northern regions. This could indicate climate change impacts on plant phenology..."
    },
    { 
      id: 2,
      title: "Climate Change Impact on Flowering Times", 
      author: "Prof. Michael Torres", 
      replies: 8,
      likes: 32,
      time: "5 hours ago",
      tags: ["Climate", "Research", "Phenology"],
      content: "Our 10-year study reveals significant shifts in flowering schedules. Some species are blooming up to 3 weeks earlier than historical averages..."
    },
    { 
      id: 3,
      title: "Citizen Science: How to Contribute", 
      author: "BloomWatch Team", 
      replies: 15,
      likes: 67,
      time: "1 day ago",
      tags: ["Citizen Science", "Guide", "Community"],
      content: "Learn how you can contribute to global bloom tracking through our citizen science program. Every observation matters!"
    },
    { 
      id: 4,
      title: "Machine Learning in Phenology Prediction", 
      author: "Dr. Alex Kumar", 
      replies: 6,
      likes: 28,
      time: "2 days ago",
      tags: ["AI", "Machine Learning", "Prediction"],
      content: "Exploring how ML algorithms can improve bloom prediction accuracy using satellite data and weather patterns..."
    },
  ]

  const blogs = [
    {
      id: 1,
      title: "The Hidden Language of Flowers",
      author: "Dr. Maria Rodriguez",
      excerpt: "Understanding how plants communicate through blooming patterns and seasonal changes...",
      readTime: "5 min read",
      likes: 89,
      date: "Dec 20, 2024"
    },
    {
      id: 2,
      title: "NASA Earth Observations: A Game Changer",
      author: "Prof. James Wilson",
      excerpt: "How satellite imagery is revolutionizing our understanding of global vegetation patterns...",
      readTime: "7 min read",
      likes: 124,
      date: "Dec 18, 2024"
    }
  ]

  const collaborators = [
    { name: "Dr. Sarah Chen", role: "Plant Biologist", institution: "Stanford University", avatar: "SC" },
    { name: "Prof. Michael Torres", role: "Climate Scientist", institution: "MIT", avatar: "MT" },
    { name: "Dr. Alex Kumar", role: "Data Scientist", institution: "Google Research", avatar: "AK" },
  ]

  const handlePostDiscussion = () => {
    if (newTitle && newPost) {
      // In a real app, this would make an API call
      console.log("Posting discussion:", { title: newTitle, content: newPost })
      setNewTitle("")
      setNewPost("")
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Community Platform</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Research
          </Button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === "discussions" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("discussions")}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Discussions ({discussions.length})
        </Button>
        <Button
          variant={activeTab === "blogs" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("blogs")}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Research Blogs ({blogs.length})
        </Button>
        <Button
          variant={activeTab === "collaboration" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("collaboration")}
        >
          <Users className="w-4 h-4 mr-2" />
          Collaboration ({collaborators.length})
        </Button>
      </div>
      
      {/* Discussions Tab */}
      {activeTab === "discussions" && (
        <div className="space-y-4">
          {/* New Post Form */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Start a New Discussion</h4>
            <div className="space-y-3">
              <Input 
                placeholder="Discussion title..." 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
              />
              <Textarea 
                placeholder="Share your thoughts, research findings, or questions..." 
                value={newPost} 
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button onClick={handlePostDiscussion} disabled={!newTitle || !newPost}>
                  Post Discussion
                </Button>
              </div>
            </div>
          </div>
          
          {/* Discussions List */}
          <div className="space-y-3">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium cursor-pointer hover:text-primary" onClick={() => setSelectedDiscussion(discussion.id)}>
                    {discussion.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{discussion.likes}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{discussion.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>by {discussion.author}</span>
                    <span>{discussion.time}</span>
                    <span>{discussion.replies} replies</span>
                  </div>
                  
                  <div className="flex gap-1">
                    {discussion.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Blogs Tab */}
      {activeTab === "blogs" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Research Blogs</h4>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Write Blog Post
            </Button>
          </div>
          
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{blog.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{blog.likes}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{blog.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>by {blog.author}</span>
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Collaboration Tab */}
      {activeTab === "collaboration" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Research Collaborators</h4>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Join Collaboration
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {collaborator.avatar}
                  </div>
                  <div>
                    <h5 className="font-medium">{collaborator.name}</h5>
                    <p className="text-sm text-muted-foreground">{collaborator.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{collaborator.institution}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Award className="w-4 h-4 mr-2" />
                    Collaborate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Discussion Detail Modal */}
      {selectedDiscussion !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">
                  {discussions.find(d => d.id === selectedDiscussion)?.title}
                </h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedDiscussion(null)}
                >
                  Close
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p>{discussions.find(d => d.id === selectedDiscussion)?.content}</p>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium">Replies</h5>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm">Great research! I've observed similar patterns in my region...</p>
                      <p className="text-xs text-muted-foreground mt-1">by Dr. Jane Smith • 1 hour ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm">This aligns with our findings in the Mediterranean region...</p>
                      <p className="text-xs text-muted-foreground mt-1">by Prof. Carlos Mendez • 2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Textarea placeholder="Add your reply..." rows={2} className="flex-1" />
                  <Button>
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
