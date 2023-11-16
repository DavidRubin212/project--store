import { useEffect, useRef, useState } from 'react';

import Map from 'ol/Map.js';
// Import - Import for View
import View from 'ol/View.js';
// Import - Import for Layers and Layers Source
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
// Import - Import for Controls
import { MousePosition } from 'ol/control';
// Import - Import for function that creates cordinates
import { createStringXY } from 'ol/coordinate';


import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';

interface MapComponentProps {
    points: {height: number, width: number }[];
  }


function MapComponent({ points }: MapComponentProps) {
    const features = points.map((point) => new Feature(new Point([point.height, point.width])));

  
  // State inizialization - State for Map ref and Map
  const mapTargetElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>()


  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://cdn-icons-png.flaticon.com/512/6615/6615039.png',
      width: 20
    }),
  });

  const markersLayer = new VectorLayer({
    source: new VectorSource({
      features
    }),
    style: iconStyle
  });
  

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({ source: new OSM() }),
        markersLayer
      ],
      view: new View({
        center: [3893903,3770461],
        zoom: 8,
        minZoom: 0,
        maxZoom: 28,
      }),
    })
    map.setTarget(mapTargetElement.current || "")
    setMap(map)
    return () => map.setTarget("")
  }, [])

  
  return (
    <>
      <div
        ref={mapTargetElement}
        className="map"
        style={{
          width: "600px",
          height: "600px",
          position: "relative",
        }} >
      </div>
    </>
  )
}

export default MapComponent