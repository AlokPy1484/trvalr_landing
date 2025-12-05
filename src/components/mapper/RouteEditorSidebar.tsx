
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from "@/lib/utils";

import {
  X,
  MapPin,
  Wand2,
  SendHorizontal,
  Edit2,
  Trash2,
  Settings,
  Plus,
  Waypoints,
  Plane,
  Rocket, // For Helicopter
  Car,
  BusFront, // For Bus
  TrainFront, // For Train
  Bike,
  Ship, // For Ferry
  PersonStanding, // For Walking
  Bus as VanIcon, // For Van/Minibus (using Bus icon)
  Check,
  Square as IconSquare,
  RectangleHorizontal as IconWide,
  RectangleVertical as IconPortrait,
  type LucideIcon,
} from 'lucide-react';

const availableTransportIcons = {
  Plane: { icon: Plane, label: 'Plane' },
  Seaplane: { icon: Plane, label: 'Seaplane' }, // Using Plane icon for Seaplane
  Helicopter: { icon: Rocket, label: 'Helicopter' },
  Car: { icon: Car, label: 'Car' },
  Bus: { icon: BusFront, label: 'Bus' },
  Train: { icon: TrainFront, label: 'Train' },
  Motorcycle: { icon: Bike, label: 'Motorcycle' },
  Ferry: { icon: Ship, label: 'Ferry' },
  Bicycle: { icon: Bike, label: 'Bicycle' }, // Using Bike icon for Bicycle
  Walking: { icon: PersonStanding, label: 'Walking' },
  Van: { icon: VanIcon, label: 'Van' },
} as const;

type TransportMode = keyof typeof availableTransportIcons;

interface Waypoint {
  id: string;
  name: string;
  flagCode: string;
  transportMode: TransportMode;
}

const initialWaypoints: Waypoint[] = [
  { id: '1', name: 'Delhi', flagCode: 'IN', transportMode: 'Plane' },
  { id: '2', name: 'Kuala Lumpur', flagCode: 'MY', transportMode: 'Plane' },
  { id: '3', name: 'Manila', flagCode: 'PH', transportMode: 'Car' },
  { id: '4', name: 'El Nido', flagCode: 'PH', transportMode: 'Ferry' },
  { id: '5', name: 'Kalibo', flagCode: 'PH', transportMode: 'Bus' },
  { id: '6', name: 'Cebu', flagCode: 'PH', transportMode: 'Plane' },
  { id: '7', name: 'Bohol', flagCode: 'PH', transportMode: 'Ferry' },
  { id: '8', name: 'Siargao Island', flagCode: 'PH', transportMode: 'Plane' },
];

const tripSuggestions = [
  "Flight from Paris to London via Amsterdam",
  "Eurotrip by car: Madrid, Nice, Rome, Berlin in 2 weeks",
  "Adventure in Patagonia: hiking and glaciers",
  "Southeast Asia backpacking: Thailand, Vietnam, Cambodia",
];

export interface VisualOptions {
  backgroundColor?: string;
  speedFactor?: number; // 0 (slowest) to 1 (fastest)
  distanceUnit?: 'km' | 'mi';
  mapTheme?: 'light' | 'gray' | 'day' | 'night';
  // Add other visual properties as needed
}

interface RouteEditorSidebarProps {
  isOpen: boolean;
  activeSection: 'route' | 'options';
  onClose: () => void;
  onVisualOptionsChange?: (options: VisualOptions) => void;
}

export function RouteEditorSidebar({ isOpen, activeSection, onClose, onVisualOptionsChange }: RouteEditorSidebarProps) {
  const [waypoints, setWaypoints] = useState<Waypoint[]>(initialWaypoints);
  const [newCoordName, setNewCoordName] = useState('');

  const [editingWaypointId, setEditingWaypointId] = useState<string | null>(null);
  const [editingWaypointName, setEditingWaypointName] = useState<string>('');
  const [currentTransportEditIndex, setCurrentTransportEditIndex] = useState<number | null>(null);

  // State for Options section
  const [mainStyle, setMainStyle] = useState<'eco' | 'earth'>('eco');
  const [mapAspectRatio, setMapAspectRatio] = useState<'square' | 'wide' | 'portrait'>('wide');
  const [mapTheme, setMapTheme] = useState<'light' | 'gray' | 'day' | 'night'>('night');
  
  const [backgroundColor, setBackgroundColor] = useState<string>('#0A0F1E'); // Default dark blue
  const [linePointsColor, setLinePointsColor] = useState<string>('#3B82F6'); // Default blue
  const [activeRegionColor, setActiveRegionColor] = useState<string>('#EC4899'); // Default pink
  const [labelsColor, setLabelsColor] = useState<string>('#F0F4F3'); // Default light gray for labels on dark bg

  const [speedValue, setSpeedValue] = useState<number[]>([50]); // Represents 0-100%
  const [speedUnit, setSpeedUnit] = useState<'km' | 'mi'>('km');
  const [startZoom, setStartZoom] = useState<number[]>([30]);
  const [endZoom, setEndZoom] = useState<number[]>([70]);
  const [hideLogo, setHideLogo] = useState<boolean>(false);
  const [fpsValue, setFpsValue] = useState<string>('30');
  const [placeLabelsMode, setPlaceLabelsMode] = useState<'current' | 'visited' | 'always'>('always');

  useEffect(() => {
    if (onVisualOptionsChange) {
      onVisualOptionsChange({ backgroundColor });
    }
  }, [backgroundColor, onVisualOptionsChange]);

  useEffect(() => {
    if (onVisualOptionsChange) {
      onVisualOptionsChange({ speedFactor: speedValue[0] / 100 });
    }
  }, [speedValue, onVisualOptionsChange]);

  useEffect(() => {
    if (onVisualOptionsChange) {
      onVisualOptionsChange({ distanceUnit: speedUnit });
    }
  }, [speedUnit, onVisualOptionsChange]);
  
  useEffect(() => {
    if (onVisualOptionsChange) {
      onVisualOptionsChange({ mapTheme: mapTheme });
    }
  }, [mapTheme, onVisualOptionsChange]);


  const handleStartEditWaypoint = (waypoint: Waypoint) => {
    setEditingWaypointId(waypoint.id);
    setEditingWaypointName(waypoint.name);
  };

  const handleSaveWaypointName = (id: string) => {
    setWaypoints(prev =>
      prev.map(wp =>
        wp.id === id ? { ...wp, name: editingWaypointName } : wp
      )
    );
    setEditingWaypointId(null);
    setEditingWaypointName('');
  };

  const handleEditInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (event.key === 'Enter') {
      handleSaveWaypointName(id);
    } else if (event.key === 'Escape') {
      setEditingWaypointId(null);
      setEditingWaypointName('');
    }
  };

  const handleDeleteWaypoint = (id: string) => {
    setWaypoints(prev => prev.filter(wp => wp.id !== id));
    console.log(`Delete waypoint: ${id}`);
  };

  const handleAddWaypoint = () => {
    if (!newCoordName.trim()) return;
    let flag = 'UN'; 
    const lowerCoordName = newCoordName.toLowerCase();
    if (lowerCoordName.includes('delhi')) flag = 'IN';
    else if (lowerCoordName.includes('kuala lumpur')) flag = 'MY';
    else if (lowerCoordName.includes('manila') || lowerCoordName.includes('el nido') || lowerCoordName.includes('kalibo') || lowerCoordName.includes('cebu') || lowerCoordName.includes('bohol') || lowerCoordName.includes('siargao')) flag = 'PH';
    else if (lowerCoordName.includes('paris')) flag = 'FR';
    else if (lowerCoordName.includes('london')) flag = 'GB';
    else if (lowerCoordName.includes('madrid')) flag = 'ES';
    else if (lowerCoordName.includes('rome')) flag = 'IT';
    else if (lowerCoordName.includes('berlin')) flag = 'DE';
    else if (lowerCoordName.includes('nyc') || lowerCoordName.includes('lax') || lowerCoordName.includes('tpa')) flag = 'US';
    else if (lowerCoordName.includes('patagonia')) flag = 'AR';
    else if (lowerCoordName.includes('thailand')) flag = 'TH';
    else if (lowerCoordName.includes('vietnam')) flag = 'VN';
    else if (lowerCoordName.includes('cambodia')) flag = 'KH';

    const newWaypoint: Waypoint = {
      id: String(Date.now()),
      name: newCoordName.trim(),
      flagCode: flag,
      transportMode: 'Plane', 
    };
    setWaypoints(prev => [...prev, newWaypoint]);
    setNewCoordName('');
    console.log(`Add waypoint: ${newCoordName.trim()}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log(`Suggestion clicked: ${suggestion}`);
  };

  const handleTransportModeChange = (waypointIndex: number, newMode: TransportMode) => {
    setWaypoints(prev =>
      prev.map((wp, index) =>
        index === waypointIndex ? { ...wp, transportMode: newMode } : wp
      )
    );
    setCurrentTransportEditIndex(null); 
  };

  const ColorPickerButton = ({ label, color, onChange, isPro = false }: { label: string, color: string, onChange: (newColor: string) => void, isPro?: boolean }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {isPro && <Badge variant="default" className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5">PRO</Badge>}
      </div>
      <div className="relative w-7 h-7 rounded border border-border cursor-pointer overflow-hidden">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div style={{ backgroundColor: color }} className="w-full h-full"></div>
      </div>
    </div>
  );


  const SectionIcon = activeSection === 'route' ? Waypoints : Settings;
  const sectionTitle = activeSection === 'route' ? 'Route' : 'Options';

  return (
    <div className={cn(
      "bg-card text-card-foreground h-full shadow-lg relative transition-[width] duration-300 ease-in-out overflow-hidden",
      isOpen ? "w-96 border-r border-border" : "w-0 border-none"
    )}>
      <div className={cn("h-full flex flex-col w-96")}>
        <div className="p-3 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <SectionIcon className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{sectionTitle}</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close panel</span>
          </Button>
        </div>

        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-6">
            {activeSection === 'route' && (
              <>
                <div className="space-y-1">
                  {waypoints.map((waypoint, index) => {
                    const CurrentTransportIcon = availableTransportIcons[waypoint.transportMode].icon;
                    return (
                      <div key={waypoint.id} className="group flex items-center p-2 rounded-md hover:bg-muted/30">
                         <Popover open={currentTransportEditIndex === index} onOpenChange={(isOpenState) => !isOpenState && setCurrentTransportEditIndex(null)}>
                          <PopoverTrigger asChild>
                             <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 mr-2 text-primary flex-shrink-0"
                              onClick={() => setCurrentTransportEditIndex(index)}
                            >
                              <CurrentTransportIcon className="h-5 w-5" />
                              <span className="sr-only">Change transport mode for {waypoint.name}</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2">
                            <div className="grid grid-cols-5 gap-1">
                              {Object.entries(availableTransportIcons).map(([key, { icon: IconComponent, label }]) => (
                                <Button
                                  key={key}
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9"
                                  title={label}
                                  onClick={() => handleTransportModeChange(index, key as TransportMode)}
                                >
                                  <IconComponent className="h-5 w-5" />
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>

                        <Image
                          src={`https://flagcdn.com/w20/${waypoint.flagCode.toLowerCase()}.png`} 
                          alt={`${waypoint.flagCode} flag`}
                          width={20}
                          height={15}
                          className="mr-2 rounded-sm object-cover flex-shrink-0"
                          data-ai-hint={`${waypoint.flagCode.toLowerCase()} flag`}
                        />
                        {editingWaypointId === waypoint.id ? (
                          <Input
                            type="text"
                            value={editingWaypointName}
                            onChange={(e) => setEditingWaypointName(e.target.value)}
                            onBlur={() => handleSaveWaypointName(waypoint.id)}
                            onKeyDown={(e) => handleEditInputKeyDown(e, waypoint.id)}
                            className="h-7 text-sm flex-grow min-w-0"
                            autoFocus
                          />
                        ) : (
                          <span className="flex-grow text-sm truncate text-foreground" onDoubleClick={() => handleStartEditWaypoint(waypoint)}>
                            {waypoint.name}
                          </span>
                        )}
                        <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleStartEditWaypoint(waypoint)}>
                            <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
                            <span className="sr-only">Edit {waypoint.name}</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDeleteWaypoint(waypoint.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            <span className="sr-only">Delete {waypoint.name}</span>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow min-w-0">
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Add city or coordinate..."
                        className="pl-8 w-full"
                        value={newCoordName}
                        onChange={(e) => setNewCoordName(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddWaypoint();
                            e.preventDefault(); 
                          }
                        }}
                      />
                    </div>
                    <Button variant="outline" className="shrink-0" onClick={handleAddWaypoint}>
                      <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-12 text-left justify-between items-center text-muted-foreground hover:text-primary hover:border-primary/70"
                  onClick={() => console.log('Your trip in any words clicked')}
                >
                  <div className="flex items-center">
                    <Wand2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Your trip in any words</span>
                  </div>
                  <SendHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tripSuggestions.slice(0, 2).map((suggestion, index) => ( // Show fewer pills
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="rounded-full text-xs px-2 py-1 h-auto leading-normal border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/70"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label htmlFor="google-directions-toggle" className="text-sm font-medium text-foreground">
                      Real Routes (Google Directions API)
                    </label>
                    <Badge variant="default" className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5">PRO</Badge>
                  </div>
                  <Switch
                    id="google-directions-toggle"
                    checked={false} // Placeholder
                    onCheckedChange={() => {}} // Placeholder
                  />
                </div>
              </>
            )}

            {activeSection === 'options' && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Main style</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['eco', 'earth'] as const).map((style) => (
                      <Button
                        key={style}
                        variant={mainStyle === style ? 'default' : 'outline'}
                        onClick={() => setMainStyle(style)}
                        className={cn("h-auto p-2 flex flex-col items-center justify-center relative", mainStyle === style && "ring-2 ring-primary border-primary")}
                      >
                        {mainStyle === style && <Check className="absolute top-1 right-1 h-4 w-4 text-primary-foreground bg-primary rounded-full p-0.5"/>}
                        <Image src={style === 'eco' ? "https://placehold.co/100x60/a7f3d0/166534.png?text=Eco" : "https://placehold.co/100x60/fde68a/78350f.png?text=Earth"} alt={style} width={100} height={60} className="rounded-md mb-1 object-cover" data-ai-hint={style === 'eco' ? 'eco map' : 'earth map'} />
                        <span className="text-xs capitalize">{style}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Aspect Ratio</label>
                   <div className="grid grid-cols-3 gap-2">
                      <Button variant={mapAspectRatio === 'square' ? 'secondary' : 'ghost'} onClick={() => setMapAspectRatio('square')} className="h-10"> <IconSquare className="h-5 w-5"/> </Button>
                      <Button variant={mapAspectRatio === 'wide' ? 'secondary' : 'ghost'} onClick={() => setMapAspectRatio('wide')} className="h-10"> <IconWide className="h-5 w-5"/> </Button>
                      <Button variant={mapAspectRatio === 'portrait' ? 'secondary' : 'ghost'} onClick={() => setMapAspectRatio('portrait')} className="h-10"> <IconPortrait className="h-5 w-5"/> </Button>
                   </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Map Theme</label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant={mapTheme === 'light' ? 'default' : 'outline'} onClick={() => setMapTheme('light')} className="text-xs h-9 capitalize hover:bg-slate-200">Light</Button>
                    <Button variant={mapTheme === 'gray' ? 'default' : 'outline'} onClick={() => setMapTheme('gray')} className="text-xs h-9 capitalize hover:bg-slate-400">Gray</Button>
                    <Button variant={mapTheme === 'day' ? 'default' : 'outline'} onClick={() => setMapTheme('day')} className="text-xs h-9 capitalize hover:bg-sky-500">Day</Button>
                    <Button variant={mapTheme === 'night' ? 'default' : 'outline'} onClick={() => setMapTheme('night')} className="text-xs h-9 capitalize bg-slate-800 text-slate-200 hover:bg-slate-700">Night</Button>
                  </div>
                </div>

                <ColorPickerButton label="Background" color={backgroundColor} onChange={setBackgroundColor} />
                <Separator />
                <ColorPickerButton label="Line and Points" color={linePointsColor} onChange={setLinePointsColor} isPro />
                <ColorPickerButton label="Active region" color={activeRegionColor} onChange={setActiveRegionColor} isPro />
                <ColorPickerButton label="Labels" color={labelsColor} onChange={setLabelsColor} isPro />
                <Separator />

                <div>
                  <label htmlFor="speed-slider" className="text-sm font-medium text-foreground mb-1 block">Speed</label>
                  <div className="flex items-center gap-2">
                      <Slider
                          id="speed-slider"
                          value={speedValue}
                          onValueChange={setSpeedValue}
                          max={100}
                          step={1}
                          className="flex-grow"
                      />
                      <div className="flex items-center border rounded-md">
                          <Button variant={speedUnit === 'km' ? 'secondary' : 'ghost'} size="sm" onClick={() => setSpeedUnit('km')} className="rounded-r-none border-r h-8 px-2 text-xs">km</Button>
                          <Button variant={speedUnit === 'mi' ? 'secondary' : 'ghost'} size="sm" onClick={() => setSpeedUnit('mi')} className="rounded-l-none h-8 px-2 text-xs">mi</Button>
                      </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="start-zoom-slider" className="text-sm font-medium text-foreground mb-1 block">Starting Zoom-In</label>
                  <Slider id="start-zoom-slider" value={startZoom} onValueChange={setStartZoom} max={100} step={1} />
                </div>
                <div>
                  <label htmlFor="end-zoom-slider" className="text-sm font-medium text-foreground mb-1 block">Ending Zoom-Out</label>
                  <Slider id="end-zoom-slider" value={endZoom} onValueChange={setEndZoom} max={100} step={1} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <label htmlFor="hide-logo-toggle" className="text-sm font-medium text-foreground">Hide logo</label>
                      <Badge variant="default" className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5">PRO</Badge>
                  </div>
                  <Switch id="hide-logo-toggle" checked={hideLogo} onCheckedChange={setHideLogo} />
                </div>

                <div>
                  <label htmlFor="fps-select" className="text-sm font-medium text-foreground mb-1 block">FPS</label>
                  <Select value={fpsValue} onValueChange={setFpsValue}>
                      <SelectTrigger id="fps-select" className="w-[100px]">
                          <SelectValue placeholder="FPS" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="24">24</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="60">60</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Place labels</label>
                  <div className="grid grid-cols-3 gap-2">
                      {(['current', 'visited', 'always'] as const).map((mode) => (
                          <Button
                              key={mode}
                              variant={placeLabelsMode === mode ? 'default' : 'outline'}
                              onClick={() => setPlaceLabelsMode(mode)}
                              className="text-xs h-9 capitalize"
                          >
                              {mode}
                          </Button>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
