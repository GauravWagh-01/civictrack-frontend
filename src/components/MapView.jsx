import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STATUS_COLORS, DEFAULT_MAP_CENTER } from '../utils/constants.js';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

/** Create a colored circle icon for a map marker */
const createColoredIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="
        width: 28px;
        height: 28px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
    });
};

/** Fits map bounds to show all project markers */
function MapBounds({ projects }) {
    const map = useMap();

    useEffect(() => {
        if (projects.length > 0) {
            const bounds = L.latLngBounds(projects.map((p) => p.coordinates));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        }
    }, [projects, map]);

    return null;
}

/**
 * Interactive Leaflet map showing infrastructure project markers
 * @param {Object} props
 * @param {import('../api/mockData.js').InfrastructureProject[]} props.projects
 * @param {(project: import('../api/mockData.js').InfrastructureProject) => void} props.onProjectClick
 */
export function MapView({ projects, onProjectClick }) {
    // Memoize icons to avoid recreating on every render
    const iconCache = useMemo(() => {
        const cache = {};
        Object.entries(STATUS_COLORS).forEach(([status, color]) => {
            cache[status] = createColoredIcon(color);
        });
        return cache;
    }, []);

    return (
        <div className="h-full w-full relative">
            <MapContainer
                center={DEFAULT_MAP_CENTER}
                zoom={12}
                scrollWheelZoom={true}
                className="h-full w-full z-[1]"
                zoomControl={true}
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                    minZoom={3}
                />
                <MapBounds projects={projects} />
                {projects.map((project) => (
                    <Marker
                        key={project.id}
                        position={project.coordinates}
                        icon={iconCache[project.status]}
                        eventHandlers={{
                            click: () => onProjectClick(project),
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
                                <p className="text-xs text-gray-600">{project.department}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
