
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Coordinates (Latitude, Longitude)
const NEW_DELHI = { lat: 28.6139, lon: 77.2090 };
const KUALA_LUMPUR = { lat: 3.1390, lon: 101.6869 };
const GLOBE_RADIUS = 5;
const FLIGHT_ALTITUDE_FACTOR = 0.3;

const BASE_DISTANCE_KM = 3852;
const KM_TO_MILES = 0.621371;

const MIN_ANIMATION_DURATION_MS = 2000;
const MAX_ANIMATION_DURATION_MS = 15000;

// Texture URLs
const DAY_TEXTURE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Blue_Marble_Next_Generation_%2B_topography_%2B_bathymetry.jpg/4096px-Blue_Marble_Next_Generation_%2B_topography_%2B_bathymetry.jpg';
const NIGHT_TEXTURE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/4096px-The_earth_at_night.jpg';
const CLOUDS_TEXTURE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Visible_Earth_Clouds_2001-05-24.png/4096px-Visible_Earth_Clouds_2001-05-24.png';
const SPECULAR_MAP_URL = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Earthmap_specular_2048.jpg';
const BUMP_MAP_URL = 'https://upload.wikimedia.org/wikipedia/commons/0/09/Earth_elevation_2048.jpg';
const BORDERS_TEXTURE_URL = 'https://upload.wikimedia.org/wikipedia/commons/a/a9/A_large_blank_world_map_with_oceans_marked_in_blue.png';


// Function to convert Latitude/Longitude to Cartesian coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

interface FlightAnimatorProps {
  isPlaying: boolean;
  sceneBackgroundColor: string;
  animationSpeedFactor: number;
  distanceUnit: 'km' | 'mi';
  mapTheme: 'light' | 'gray' | 'day' | 'night';
  isSidebarOpen: boolean;
}

export function FlightAnimator({
  isPlaying,
  sceneBackgroundColor,
  animationSpeedFactor,
  distanceUnit,
  mapTheme,
  isSidebarOpen,
}: FlightAnimatorProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [distanceText, setDistanceText] = useState('');
  const [showDistance, setShowDistance] = useState(false);
  
  // Refs for scene objects
  const animationFrameId = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const earthGroupRef = useRef<THREE.Group | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const curveRef = useRef<THREE.QuadraticBezierCurve3 | null>(null);
  
  // Refs for animation state
  const animationProgress = useRef(0);
  const lastTimestamp = useRef(0);
  const controlsTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  // Refs for hover effect
  const borderMeshRef = useRef<THREE.Mesh | null>(null);
  const targetBorderOpacity = useRef(0);
  const raycaster = useRef(new THREE.Raycaster());
  const mousePosition = useRef(new THREE.Vector2());
  
  // Ref to hold the latest prop values to avoid stale closures in the animation loop
  const latestProps = useRef({ isPlaying, animationSpeedFactor, distanceUnit });
  
  // Effect to update the refs when props change
  useEffect(() => {
    latestProps.current = { isPlaying, animationSpeedFactor, distanceUnit };
  }, [isPlaying, animationSpeedFactor, distanceUnit]);
  
  const startAnimation = useCallback(() => {
    animationProgress.current = 0;
    lastTimestamp.current = performance.now();
    setShowDistance(false);
    if (planeRef.current && curveRef.current) {
      planeRef.current.position.copy(curveRef.current.getPointAt(0));
      planeRef.current.visible = true;
    }
  }, []);
  
  const handleResize = useCallback(() => {
    if (mountRef.current && rendererRef.current && cameraRef.current) {
      const { clientWidth, clientHeight } = mountRef.current;
      cameraRef.current.aspect = clientWidth / clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(clientWidth, clientHeight);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (animationProgress.current >= 1) {
        startAnimation();
      }
      if (!lastTimestamp.current) {
         lastTimestamp.current = performance.now();
      }
    }
  }, [isPlaying, startAnimation]);

  useEffect(() => {
    controlsTargetRef.current.set(isSidebarOpen ? -2.5 : 0, 0, 0);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    cameraRef.current.position.z = 15;

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(rendererRef.current.domElement);
    
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(sceneBackgroundColor), 1);
    }

    earthGroupRef.current = new THREE.Group();
    sceneRef.current.add(earthGroupRef.current);
    
    const textureLoader = new THREE.TextureLoader();
    
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(DAY_TEXTURE_URL),
    });
    globeRef.current = new THREE.Mesh(globeGeometry, globeMaterial);
    globeRef.current.name = 'globe';
    earthGroupRef.current.add(globeRef.current);

    // Add border mesh
    const borderGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.02, 64, 64);
    const borderMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(BORDERS_TEXTURE_URL),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
    });
    borderMeshRef.current = new THREE.Mesh(borderGeometry, borderMaterial);
    earthGroupRef.current.add(borderMeshRef.current);
    
    const cloudGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.05, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(CLOUDS_TEXTURE_URL),
      transparent: true,
      opacity: 0.6
    });
    const cloudsMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudsMesh.name = 'clouds';
    earthGroupRef.current.add(cloudsMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    ambientLight.name = 'ambientLight';
    sceneRef.current.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.name = 'directionalLight';
    directionalLight.position.set(5, 3, 5);
    sceneRef.current.add(directionalLight);

    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.minDistance = GLOBE_RADIUS + 2;
    controlsRef.current.maxDistance = GLOBE_RADIUS * 5;
    controlsRef.current.target.copy(controlsTargetRef.current);
    
    const kulVec = latLonToVector3(KUALA_LUMPUR.lat, KUALA_LUMPUR.lon, GLOBE_RADIUS);
    cameraRef.current.position.copy(kulVec.clone().normalize().multiplyScalar(GLOBE_RADIUS + 8));
    cameraRef.current.lookAt(controlsRef.current.target);

    const startPoint = latLonToVector3(NEW_DELHI.lat, NEW_DELHI.lon, GLOBE_RADIUS + 0.1);
    const endPoint = latLonToVector3(KUALA_LUMPUR.lat, KUALA_LUMPUR.lon, GLOBE_RADIUS + 0.1);

    const midPointControl = new THREE.Vector3()
      .addVectors(startPoint, endPoint)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS + FLIGHT_ALTITUDE_FACTOR);
    curveRef.current = new THREE.QuadraticBezierCurve3(startPoint, midPointControl, endPoint);
    
    const curvePoints = curveRef.current.getPoints(50);
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0x00FFFF, linewidth: 2 });
    const flightPath = new THREE.Line(pathGeometry, pathMaterial);
    earthGroupRef.current.add(flightPath);
    
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff4136 });
    const delhiMarker = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), markerMaterial);
    delhiMarker.position.copy(startPoint);
    earthGroupRef.current.add(delhiMarker);

    const kulMarker = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), markerMaterial);
    kulMarker.position.copy(endPoint);
    earthGroupRef.current.add(kulMarker);

    const planeGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xcccccc });
    planeRef.current = new THREE.Mesh(planeGeometry, planeMaterial);
    planeRef.current.position.copy(startPoint);
    planeRef.current.rotateX(Math.PI / 2);
    planeRef.current.visible = false;
    earthGroupRef.current.add(planeRef.current);

    startAnimation();

    const onMouseMove = (event: MouseEvent) => {
        if (mountRef.current) {
            const rect = mountRef.current.getBoundingClientRect();
            mousePosition.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mousePosition.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        }
    };

    const onMouseLeave = () => {
        targetBorderOpacity.current = 0;
    };
    currentMount.addEventListener('mousemove', onMouseMove);
    currentMount.addEventListener('mouseleave', onMouseLeave);

    const animate = (timestamp: number) => {
      animationFrameId.current = requestAnimationFrame(animate);
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !controlsRef.current || !earthGroupRef.current || !planeRef.current || !curveRef.current || !globeRef.current || !borderMeshRef.current) return;

      const deltaTime = timestamp - lastTimestamp.current;
      lastTimestamp.current = timestamp;

      // Read latest props from the ref to avoid stale closures
      const { isPlaying: currentIsPlaying, animationSpeedFactor: currentSpeedFactor, distanceUnit: currentDistanceUnit } = latestProps.current;
      const currentAnimationDuration = MAX_ANIMATION_DURATION_MS - (currentSpeedFactor * (MAX_ANIMATION_DURATION_MS - MIN_ANIMATION_DURATION_MS));

      if (currentIsPlaying && animationProgress.current < 1) {
        animationProgress.current += deltaTime / currentAnimationDuration;
        animationProgress.current = Math.min(animationProgress.current, 1);

        const currentPoint = curveRef.current.getPointAt(animationProgress.current);
        planeRef.current.position.copy(currentPoint);

        if (animationProgress.current < 0.99) {
          const nextPoint = curveRef.current.getPointAt(Math.min(animationProgress.current + 0.01, 1));
          planeRef.current.lookAt(nextPoint);
          planeRef.current.rotateX(Math.PI / 2);
        }
        
        if (animationProgress.current >= 1) {
          const displayDistance = currentDistanceUnit === 'mi' ? (BASE_DISTANCE_KM * KM_TO_MILES) : BASE_DISTANCE_KM;
          setDistanceText(`+${Math.round(displayDistance).toLocaleString()} ${currentDistanceUnit}`);
          setShowDistance(true);
          planeRef.current.visible = false;
        }
      } else if (!currentIsPlaying && animationProgress.current < 1) {
         if (planeRef.current) planeRef.current.visible = true;
      }
      
      if (controlsRef.current) {
        controlsRef.current.target.lerp(controlsTargetRef.current, 0.1);
      }
      
      // Hover effect logic
      raycaster.current.setFromCamera(mousePosition.current, cameraRef.current);
      const intersects = raycaster.current.intersectObject(globeRef.current);
      targetBorderOpacity.current = intersects.length > 0 ? 0.4 : 0;
      
      const borderMat = borderMeshRef.current.material as THREE.MeshBasicMaterial;
      borderMat.opacity += (targetBorderOpacity.current - borderMat.opacity) * 0.1;

      earthGroupRef.current.rotation.y += 0.0002;

      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    lastTimestamp.current = performance.now();
    animate(lastTimestamp.current);

    const resizeObserver = new ResizeObserver(() => {
        handleResize();
    });
    resizeObserver.observe(currentMount);

    return () => {
      resizeObserver.unobserve(currentMount);
      currentMount.removeEventListener('mousemove', onMouseMove);
      currentMount.removeEventListener('mouseleave', onMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      controlsRef.current?.dispose();
      
      if (sceneRef.current) {
        sceneRef.current.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material?.dispose();
            }
          }
        });
      }
      pathGeometry?.dispose();
      pathMaterial?.dispose();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (currentMount && rendererRef.current.domElement && currentMount.contains(rendererRef.current.domElement)) {
          currentMount.removeChild(rendererRef.current.domElement);
        }
      }
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation, handleResize]);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(sceneBackgroundColor), 1);
    }
  }, [sceneBackgroundColor]);

  useEffect(() => {
    if (!globeRef.current) return;
    const material = globeRef.current.material as THREE.MeshPhongMaterial;
    const textureLoader = new THREE.TextureLoader();

    const ambientLight = sceneRef.current?.getObjectByName('ambientLight') as THREE.AmbientLight;
    const directionalLight = sceneRef.current?.getObjectByName('directionalLight') as THREE.DirectionalLight;

    // Reset properties that might not be used by all themes
    material.specularMap = null;
    material.bumpMap = null;
    material.emissiveMap = null;
    material.emissive.set(0x000000);

    if (mapTheme === 'night') {
      material.map = textureLoader.load(DAY_TEXTURE_URL);
      material.emissiveMap = textureLoader.load(NIGHT_TEXTURE_URL);
      material.emissive.set(0xffffff);
      material.color.set(0xffffff);
      if (ambientLight) ambientLight.intensity = 0.1;
      if (directionalLight) directionalLight.intensity = 0.2;
      material.shininess = 10;
    } else if (mapTheme === 'gray') {
      material.map = textureLoader.load(DAY_TEXTURE_URL);
      material.color.set(0x909090);
      if (ambientLight) ambientLight.intensity = 0.6;
      if (directionalLight) directionalLight.intensity = 1.0;
      material.shininess = 0; // No shininess for gray theme
    } else if (mapTheme === 'day') {
        material.map = textureLoader.load(DAY_TEXTURE_URL);
        material.specularMap = textureLoader.load(SPECULAR_MAP_URL);
        material.bumpMap = textureLoader.load(BUMP_MAP_URL);
        material.bumpScale = 0.05;
        material.color.set(0xffffff);
        if (ambientLight) ambientLight.intensity = 1.2;
        if (directionalLight) directionalLight.intensity = 2.5;
        material.shininess = 50;
    } else { // 'light' theme
      material.map = textureLoader.load(DAY_TEXTURE_URL);
      material.color.set(0xffffff);
      if (ambientLight) ambientLight.intensity = 0.6;
      if (directionalLight) directionalLight.intensity = 1.1;
      material.shininess = 10;
    }
    material.needsUpdate = true;
  }, [mapTheme]);

  useEffect(() => {
    if (isPlaying && (animationProgress.current === 0 || animationProgress.current >= 1)) {
      startAnimation();
    }
    if (planeRef.current){
        planeRef.current.visible = isPlaying || (animationProgress.current > 0 && animationProgress.current < 1);
    }
  }, [isPlaying, startAnimation]);

  return (
    <div ref={mountRef} className="w-full h-full relative">
      {showDistance && (
         <div
          className="absolute text-sm font-medium bg-slate-800/70 text-white py-1 px-3 rounded-md shadow-lg"
          style={{
            top: '65%', 
            left: '60%', 
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          {distanceText} <span className="text-xs text-slate-300">covered</span>
        </div>
      )}
    </div>
  );
}
