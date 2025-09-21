// Demo JSON data for BloomWatch application

export const seasonalTrends = [
  { month: "Jan", blooms: 15 },
  { month: "Feb", blooms: 20 },
  { month: "Mar", blooms: 50 },
  { month: "Apr", blooms: 80 },
  { month: "May", blooms: 100 },
  { month: "Jun", blooms: 120 },
  { month: "Jul", blooms: 150 },
  { month: "Aug", blooms: 140 },
  { month: "Sep", blooms: 100 },
  { month: "Oct", blooms: 70 },
  { month: "Nov", blooms: 40 },
  { month: "Dec", blooms: 20 },
]

export const distribution = [
  { species: "Lotus", percentage: 25 },
  { species: "Cherry Blossom", percentage: 30 },
  { species: "Sunflower", percentage: 20 },
  { species: "Lavender", percentage: 25 },
]

export const climateCorrelation = [
  { factor: "Rainfall", impact: 75 },
  { factor: "Temperature", impact: 85 },
  { factor: "Soil Moisture", impact: 60 },
  { factor: "Sunlight Hours", impact: 90 },
]

export const timeline = [
  { month: "March", event: "Cherry Blossoms in Japan" },
  { month: "May", event: "Lavender Fields in France" },
  { month: "July", event: "Lotus Bloom in India" },
  { month: "August", event: "Sunflowers in Italy" },
]

export const regions = [
  {
    id: "asia",
    name: "Asia",
    activeBlooms: 125,
    hotspots: [
      { lat: 28.6, lng: 77.2, species: "Lotus", status: "Full Bloom" },
      { lat: 35.6, lng: 139.7, species: "Cherry Blossom", status: "Early Bloom" },
      { lat: 22.3, lng: 114.2, species: "Lotus", status: "Peak Bloom" },
      { lat: 31.2, lng: 121.5, species: "Cherry Blossom", status: "Full Bloom" },
      { lat: 37.5, lng: 127.0, species: "Cherry Blossom", status: "Early Bloom" },
      { lat: 13.7, lng: 100.5, species: "Lotus", status: "Late Bloom" },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    activeBlooms: 90,
    hotspots: [
      { lat: 48.8, lng: 2.3, species: "Lavender", status: "Peak Bloom" },
      { lat: 41.9, lng: 12.5, species: "Sunflower", status: "Late Bloom" },
      { lat: 43.7, lng: 7.4, species: "Lavender", status: "Full Bloom" },
      { lat: 52.5, lng: 13.4, species: "Sunflower", status: "Early Bloom" },
      { lat: 40.4, lng: -3.7, species: "Sunflower", status: "Peak Bloom" },
      { lat: 51.5, lng: -0.1, species: "Lavender", status: "Late Bloom" },
    ],
  },
  {
    id: "americas",
    name: "Americas",
    activeBlooms: 75,
    hotspots: [
      { lat: 40.7, lng: -74.0, species: "Cherry Blossom", status: "Early Bloom" },
      { lat: 34.0, lng: -118.2, species: "Sunflower", status: "Full Bloom" },
      { lat: 45.5, lng: -122.7, species: "Cherry Blossom", status: "Peak Bloom" },
      { lat: -23.5, lng: -46.6, species: "Sunflower", status: "Late Bloom" },
    ],
  },
  {
    id: "africa",
    name: "Africa",
    activeBlooms: 45,
    hotspots: [
      { lat: -33.9, lng: 18.4, species: "Sunflower", status: "Full Bloom" },
      { lat: -26.2, lng: 28.0, species: "Sunflower", status: "Peak Bloom" },
      { lat: 30.0, lng: 31.2, species: "Lotus", status: "Early Bloom" },
    ],
  },
]

export const species = [
  {
    id: "lotus",
    name: "Lotus",
    image: "/beautiful-pink-lotus-flower-in-pond.jpg",
    season: ["June", "July", "August"],
    description: "Sacred flower commonly found in Asia.",
  },
  {
    id: "cherry_blossom",
    name: "Cherry Blossom",
    image: "/pink-cherry-blossom-tree-in-spring.jpg",
    season: ["March", "April"],
    description: "Symbol of spring in Japan.",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    image: "/bright-yellow-sunflower-field.jpg",
    season: ["July", "August", "September"],
    description: "Large yellow blooms turning towards the sun.",
  },
  {
    id: "lavender",
    name: "Lavender",
    image: "/purple-lavender-field-in-provence.jpg",
    season: ["May", "June", "July"],
    description: "Fragrant purple flowers popular in Mediterranean regions.",
  },
]

export const advancedAnalytics = {
  climateCorrelation: [
    { temperature: 15, rainfall: 120, blooms: 45, species: "Cherry Blossom", region: "Asia" },
    { temperature: 22, rainfall: 80, blooms: 85, species: "Lotus", region: "Asia" },
    { temperature: 28, rainfall: 60, blooms: 95, species: "Sunflower", region: "Europe" },
    { temperature: 18, rainfall: 100, blooms: 70, species: "Lavender", region: "Europe" },
    { temperature: 25, rainfall: 45, blooms: 60, species: "Sunflower", region: "Americas" },
    { temperature: 20, rainfall: 90, blooms: 55, species: "Cherry Blossom", region: "Americas" },
    { temperature: 30, rainfall: 30, blooms: 40, species: "Lotus", region: "Africa" },
    { temperature: 16, rainfall: 110, blooms: 75, species: "Lavender", region: "Europe" },
  ],

  speciesFactors: [
    { factor: "Temperature Tolerance", lotus: 85, cherry_blossom: 60, sunflower: 95, lavender: 70 },
    { factor: "Rainfall Dependency", lotus: 90, cherry_blossom: 75, sunflower: 40, lavender: 65 },
    { factor: "Soil Quality", lotus: 70, cherry_blossom: 85, sunflower: 60, lavender: 80 },
    { factor: "Sunlight Hours", lotus: 80, cherry_blossom: 70, sunflower: 100, lavender: 75 },
    { factor: "Humidity Preference", lotus: 95, cherry_blossom: 65, sunflower: 45, lavender: 55 },
    { factor: "Wind Resistance", lotus: 60, cherry_blossom: 40, sunflower: 85, lavender: 70 },
  ],
}
