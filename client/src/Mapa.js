import React, {useState} from "react"
import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import { divIcon } from "leaflet"

export default function Mapa( {data} ){

    const [activePopup, setactivePopup] = useState(null);
    let colors = 
    {"BANCOS":"red", "FARMACIAS":"yellow", "CAFETERIAS Y SALONES DE TE":"green", "ALMACENES":"blue", "SUPERMERCADOS":"brown", "RESTAURANTES":"cyan"}

    const color = (category_name,colors) => {
        for (const property in colors) {
            if (category_name === property) {
                return colors[property]
            }
        }
    }
    
    return (
        <Map center = {[-33.4266707, -70.6202899]} zoom = {16}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {data.map(point => (
                <Marker key = {point.id}
                position = {[
                    point.latitude,
                    point.longitude
                ]}
                onClick = { () => {
                    setactivePopup(point);
                }}
                icon = {new divIcon({
                    iconSize: [40, 40],
                    html: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 512 512" fill="${color(point.category_name,colors)}" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                            <g>
                            <g>
                            <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                                c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                                c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                            </g>
                            </g>
                            </svg>`
                })}
                />
            ))}

            {activePopup && (
                <Popup position = {[
                    activePopup.latitude,
                    activePopup.longitude
                ]}
                onClose = { () => {
                    setactivePopup(null);
                }}
                >
                <div>
                    <h2>{activePopup.name}</h2>
                    <p>{activePopup.category_name}</p>
                </div>
                </Popup>
            )}
        </Map>
    )
}