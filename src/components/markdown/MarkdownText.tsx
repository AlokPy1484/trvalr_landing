import React from "react";
import ReactMarkdown from "react-markdown";
import { MapPreviewPopup } from "../trip/MapPreviewPopup";

interface MarkdownTextProps {
  text: string;
  activitySlot?: string;
  isEditMode?: boolean;
  onLocationReplace?: (oldText: string, newText: string) => void;
}

const MarkdownText: React.FC<MarkdownTextProps> = ({ text, activitySlot, isEditMode = false, onLocationReplace }) => {
  // Check if a URL is a Google Maps link
  const isGoogleMapsLink = (url: string): boolean => {
    return url.includes('maps.google.com') || 
           url.includes('google.com/maps') || 
           url.includes('goo.gl/maps');
  };

  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => {
          const safeHref = props.href ? encodeURI(props.href) : "#";
          const childrenText = typeof props.children === 'string' 
            ? props.children 
            : Array.isArray(props.children)
            ? props.children.join('')
            : 'Location';

          // Logging each clickable stop
          if (activitySlot) {
            console.log(
              `Clickable stop [${activitySlot}]:`,
              props.children,
              "->",
              safeHref
            );
          }

          // If it's a Google Maps link, use the MapPreviewPopup
          if (props.href && isGoogleMapsLink(props.href)) {
            const linkContent = (
              <a
                {...props}
                href={safeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-primary hover:text-primary/80 underline decoration-dotted transition-colors ${
                  isEditMode ? 'animate-flicker cursor-move' : ''
                }`}
                draggable={false}
                onDragOver={(e) => {
                  if (isEditMode) {
                    e.preventDefault();
                    e.currentTarget.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
                  }
                }}
                onDragLeave={(e) => {
                  if (isEditMode) {
                    e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
                  }
                }}
                onDrop={(e) => {
                  if (isEditMode) {
                    e.preventDefault();
                    const locationData = e.dataTransfer.getData('application/json');
                    if (locationData) {
                      try {
                        const location = JSON.parse(locationData);
                        if (onLocationReplace) {
                          onLocationReplace(childrenText, location.name);
                        }
                      } catch (err) {
                        console.error('Failed to parse location data:', err);
                      }
                    }
                    e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
                  }
                }}
              >
                {props.children}
              </a>
            );
            
            if (isEditMode) {
              return linkContent;
            }
            
            return (
              <MapPreviewPopup locationName={childrenText} mapsUrl={props.href}>
                {linkContent}
              </MapPreviewPopup>
            );
          }

          // Otherwise, render normal link
          return (
            <a
              {...props}
              href={safeHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-primary hover:text-primary/80 underline decoration-dotted transition-colors ${
                isEditMode ? 'animate-flicker cursor-move' : ''
              }`}
              draggable={false}
              onDragOver={(e) => {
                if (isEditMode) {
                  e.preventDefault();
                  e.currentTarget.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
                }
              }}
              onDragLeave={(e) => {
                if (isEditMode) {
                  e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
                }
              }}
              onDrop={(e) => {
                if (isEditMode) {
                  e.preventDefault();
                  const locationData = e.dataTransfer.getData('application/json');
                  if (locationData) {
                    try {
                      const location = JSON.parse(locationData);
                      if (onLocationReplace) {
                        onLocationReplace(childrenText, location.name);
                      }
                    } catch (err) {
                      console.error('Failed to parse location data:', err);
                    }
                  }
                  e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
                }
              }}
            />
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default MarkdownText;
