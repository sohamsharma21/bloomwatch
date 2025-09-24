"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, RotateCcw, ZoomIn, ZoomOut, Move3d, Flower, Leaf } from "lucide-react"

// Dynamic import for Three.js Canvas to avoid SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then(mod => ({ default: mod.Canvas })), {
  ssr: false
})

const OrbitControls = dynamic(() => import("@react-three/drei").then(mod => ({ default: mod.OrbitControls })), {
  ssr: false
})

const Environment = dynamic(() => import("@react-three/drei").then(mod => ({ default: mod.Environment })), {
  ssr: false
})

const ContactShadows = dynamic(() => import("@react-three/drei").then(mod => ({ default: mod.ContactShadows })), {
  ssr: false
})

// 3D Plant Component
function PlantModel({ type, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: { 
  type: string, 
  position?: [number, number, number], 
  scale?: number,
  rotation?: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  const getPlantGeometry = () => {
    switch (type) {
      case "cherry-blossom":
        return (
          <group ref={groupRef}>
            {/* Trunk */}
            <mesh position={[0, -1, 0]} ref={meshRef}>
              <cylinderGeometry args={[0.1, 0.15, 2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            
            {/* Branches */}
            {[...Array(6)].map((_, i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos(i * Math.PI / 3) * 0.3,
                  Math.sin(i * Math.PI / 3) * 0.5,
                  Math.sin(i * Math.PI / 3) * 0.2
                ]}
                rotation={[0, i * Math.PI / 3, 0]}
              >
                <cylinderGeometry args={[0.02, 0.05, 0.8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            ))}
            
            {/* Pink Flowers */}
            {[...Array(20)].map((_, i) => (
              <mesh 
                key={i}
                position={[
                  (Math.random() - 0.5) * 1.5,
                  Math.random() * 1.5,
                  (Math.random() - 0.5) * 1.5
                ]}
              >
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial color="#FFB6C1" />
              </mesh>
            ))}
          </group>
        )
      
      case "sunflower":
        return (
          <group ref={groupRef}>
            {/* Stem */}
            <mesh position={[0, -1, 0]} ref={meshRef}>
              <cylinderGeometry args={[0.05, 0.08, 2]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
            
            {/* Leaves */}
            {[...Array(4)].map((_, i) => (
              <mesh 
                key={i}
                position={[0, Math.sin(i * Math.PI / 2) * 0.5, 0]}
                rotation={[0, i * Math.PI / 2, 0]}
              >
                <planeGeometry args={[0.3, 0.6]} />
                <meshStandardMaterial color="#32CD32" side={THREE.DoubleSide} />
              </mesh>
            ))}
            
            {/* Flower Head */}
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.1]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            
            {/* Yellow Petals */}
            {[...Array(16)].map((_, i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos(i * Math.PI / 8) * 0.4,
                  1,
                  Math.sin(i * Math.PI / 8) * 0.4
                ]}
                rotation={[0, i * Math.PI / 8, 0]}
              >
                <planeGeometry args={[0.2, 0.4]} />
                <meshStandardMaterial color="#FFD700" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        )
      
      case "lotus":
        return (
          <group ref={groupRef}>
            {/* Water Surface */}
            <mesh position={[0, -0.5, 0]} ref={meshRef}>
              <planeGeometry args={[3, 3]} />
              <meshStandardMaterial color="#4169E1" transparent opacity={0.7} />
            </mesh>
            
            {/* Stem */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 1]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
            
            {/* Lotus Flower */}
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.3, 8, 6]} />
              <meshStandardMaterial color="#FF69B4" />
            </mesh>
            
            {/* Pink Petals */}
            {[...Array(8)].map((_, i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos(i * Math.PI / 4) * 0.3,
                  0.5,
                  Math.sin(i * Math.PI / 4) * 0.3
                ]}
                rotation={[0, i * Math.PI / 4, 0]}
              >
                <planeGeometry args={[0.2, 0.3]} />
                <meshStandardMaterial color="#FFB6C1" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        )
      
      case "lavender":
        return (
          <group ref={groupRef}>
            {/* Stem */}
            <mesh position={[0, -1, 0]} ref={meshRef}>
              <cylinderGeometry args={[0.03, 0.05, 1.5]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
            
            {/* Lavender Spikes */}
            {[...Array(5)].map((_, i) => (
              <mesh 
                key={i}
                position={[0, -0.5 + i * 0.3, 0]}
              >
                <cylinderGeometry args={[0.1, 0.1, 0.2]} />
                <meshStandardMaterial color="#9370DB" />
              </mesh>
            ))}
            
            {/* Small Purple Flowers */}
            {[...Array(30)].map((_, i) => (
              <mesh 
                key={i}
                position={[
                  (Math.random() - 0.5) * 0.2,
                  -0.5 + Math.random() * 1.5,
                  (Math.random() - 0.5) * 0.2
                ]}
              >
                <sphereGeometry args={[0.02]} />
                <meshStandardMaterial color="#8A2BE2" />
              </mesh>
            ))}
          </group>
        )
      
      default:
        return (
          <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#4CAF50" />
          </mesh>
        )
    }
  }

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {getPlantGeometry()}
    </group>
  )
}

// Scene Component
function Scene({ plantType }: { plantType: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <PlantModel type={plantType} />
      
      <Environment preset="sunset" />
      <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} position={[0, -1.4, 0]} />
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
      />
    </>
  )
}

export function Bloom3DVisualizer() {
  const [isVRMode, setIsVRMode] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState("cherry-blossom")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const plants = [
    { id: "cherry-blossom", name: "Cherry Blossom", color: "from-pink-300 to-pink-500", icon: "🌸" },
    { id: "sunflower", name: "Sunflower", color: "from-yellow-300 to-yellow-500", icon: "🌻" },
    { id: "lotus", name: "Lotus", color: "from-purple-300 to-purple-500", icon: "🪷" },
    { id: "lavender", name: "Lavender", color: "from-indigo-300 to-indigo-500", icon: "💜" },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Real 3D Bloom Visualization</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVRMode(!isVRMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isVRMode ? "Exit VR" : "Enter VR"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Move3d className="w-4 h-4 mr-2" />
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </div>
      </div>
      
      {/* Plant Selection */}
      <div className="flex gap-2 mb-4">
        {plants.map((plant) => (
          <Button
            key={plant.id}
            variant={selectedPlant === plant.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlant(plant.id)}
          >
            <span className="mr-2">{plant.icon}</span>
            {plant.name}
          </Button>
        ))}
      </div>
      
      {/* 3D Canvas */}
      <div className={`relative w-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50" : "h-96"
      }`}>
        <Canvas
          camera={{ position: [3, 3, 3], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene plantType={selectedPlant} />
        </Canvas>
        
        {/* VR Overlay */}
        {isVRMode && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white">
              <Eye className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">VR Mode Active</h4>
              <p className="text-sm">Use VR headset for immersive experience</p>
              <p className="text-xs mt-2 opacity-75">Move your head to explore</p>
            </div>
          </div>
        )}
        
        {/* Controls Info */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded text-xs">
          <div className="flex items-center gap-2">
            <Move3d className="w-4 h-4" />
            <span>Drag to rotate • Scroll to zoom • Right-click to pan</span>
          </div>
        </div>
      </div>
      
      {/* Plant Info */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Flower className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            {plants.find(p => p.id === selectedPlant)?.name}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Interactive 3D model with realistic textures and animations. 
          Use mouse/touch controls to explore the plant from all angles.
        </p>
      </div>
    </Card>
  )
}