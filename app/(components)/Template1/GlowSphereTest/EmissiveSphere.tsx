"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface EmissiveSphereProps {
  scene: THREE.Scene;
  position?: THREE.Vector3;
  radius?: number;
  initialColor?: number;
}

export default function EmissiveSphere({
  scene,
  position = new THREE.Vector3(0, 0, 0),
  radius = 1,
  initialColor = 0x00ffff,
}: EmissiveSphereProps) {
  // Store references to objects that need to be accessed by event handlers
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const sphereMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const sphereColorRef = useRef<number>(initialColor);
  const sphereEmissiveRef = useRef<boolean>(false);

  useEffect(() => {
    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: initialColor,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x000000,
      emissiveIntensity: 0,
      clearcoat: 1.0
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(position);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.name = "emissiveSphere";
    
    // Store references
    sphereRef.current = sphere;
    sphereMaterialRef.current = sphereMaterial;
    
    // Add to scene
    scene.add(sphere);
    
    // Clean up on unmount
    return () => {
      scene.remove(sphere);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, [scene, position, radius, initialColor]);

  // Toggle sphere light
  const toggleSphereLight = () => {
    if (!sphereRef.current || !sphereMaterialRef.current) return;
    
    sphereEmissiveRef.current = !sphereEmissiveRef.current;
    
    if (sphereEmissiveRef.current) {
      // Make the sphere emit light
      sphereMaterialRef.current.emissive.setHex(sphereColorRef.current);
      sphereMaterialRef.current.emissiveIntensity = 1;
      
      // Add a point light at the sphere
      const sphereLight = new THREE.PointLight(sphereColorRef.current, 5, 30);
      sphereLight.position.copy(sphereRef.current.position);
      sphereLight.castShadow = true;
      sphereLight.shadow.mapSize.width = 1024;
      sphereLight.shadow.mapSize.height = 1024;
      sphereLight.name = "sphereLight";
      scene.add(sphereLight);
      
      // Add a second, wider light for better area coverage
      const sphereAreaLight = new THREE.PointLight(sphereColorRef.current, 2, 50);
      sphereAreaLight.position.copy(sphereRef.current.position);
      sphereAreaLight.name = "sphereAreaLight";
      scene.add(sphereAreaLight);
    } else {
      // Turn off sphere emission
      sphereMaterialRef.current.emissive.setHex(0x000000);
      sphereMaterialRef.current.emissiveIntensity = 0;
      
      // Remove the sphere lights
      const sphereLight = scene.getObjectByName("sphereLight");
      if (sphereLight) scene.remove(sphereLight);
      
      const sphereAreaLight = scene.getObjectByName("sphereAreaLight");
      if (sphereAreaLight) scene.remove(sphereAreaLight);
    }
  };

  // Change sphere color
  const changeColor = () => {
    if (!sphereMaterialRef.current) return;
    
    // Generate a random color
    sphereColorRef.current = Math.random() * 0xffffff;
    
    // Update sphere color
    sphereMaterialRef.current.color.setHex(sphereColorRef.current);
    
    // Update sphere emissive if it's on
    if (sphereEmissiveRef.current) {
      sphereMaterialRef.current.emissive.setHex(sphereColorRef.current);
      
      const sphereLight = scene.getObjectByName("sphereLight");
      if (sphereLight) (sphereLight as THREE.PointLight).color.setHex(sphereColorRef.current);
      
      const sphereAreaLight = scene.getObjectByName("sphereAreaLight");
      if (sphereAreaLight) (sphereAreaLight as THREE.PointLight).color.setHex(sphereColorRef.current);
    }
  };

  return (
    <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4">
      <button 
        onClick={toggleSphereLight}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Toggle Sphere Light
      </button>
      <button 
        onClick={changeColor}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Change Color
      </button>
    </div>
  );
}