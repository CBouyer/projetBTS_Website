import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import  { LatLngExpression } from "leaflet";

export const LeafMap = () => {
    const position = { lng: 3.37, lat: 46.31 };
    const capteurRPI = {lng: 4.39024, lat: 44.6205};
    const navigate = useNavigate();

    const [markers, setMarkers] = useState<{ id: number; position: LatLngExpression }[]>([]);
    const [addingMode, setAddingMode] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

    const goToMesureCapteur = () => {
        navigate("/MesureCapteur");
    };

    // Ajout de marqueur en cliquant sur la carte
    const AjouterUnPoint = () => {
        useMapEvents({
            click(e) {
                if (addingMode) {
                    const newMarker = { id: Date.now(), position: e.latlng };
                    setMarkers((prev) => [...prev, newMarker]);
                    setAddingMode(false);
                }
            },
        });
        return null;
    };

    // Supprimer un marqueur sélectionné
    const SupprimerPoint = () => {
        if (selectedMarker !== null) {
            setMarkers((prev) => prev.filter((marker) => marker.id !== selectedMarker));
            setSelectedMarker(null);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {/* Carte */}
            <MapContainer center={position} zoom={6} style={{ height: "60vh", width: "80vw" }}>
                <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                <AjouterUnPoint />
                <Marker position={capteurRPI}>
                    <Popup>
                        rpi #1
                    </Popup>
                </Marker>
                <Marker position={position}>
                    <Popup>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia component="img" alt="photo 3" height="50"
                                       image="src/assets/website-rays-background-pattern-1637863.png" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" height={10}>
                                    Test
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }} height={-20}>
                                    Test
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={goToMesureCapteur}>Test d'aller sur la page Mesure Capteur</Button>
                            </CardActions>
                        </Card>
                    </Popup>
                </Marker>

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        eventHandlers={{ click: () => setSelectedMarker(marker.id) }}
                    >
                        <Popup>
                            <p>Point ID: {marker.id}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Boutons sous la carte */}
            <Stack direction="row" spacing={2} mt={2}>
                <Button
                    variant="contained" onClick={() => setAddingMode(true)}
                    sx={{ bottom: "-20px",
                        backgroundColor: "transparent",
                        color: "#fff",
                        textdecoration: "none",
                        fontweight: "500",
                        fontsize: "1rem",
                        padding: "5px 12px",
                        border: "2px solid #12f7ff",
                        borderradius: "25px",
                        transition: "all .3s ease"
                    }}
                >
                    Ajouter un point
                </Button>
                <Button variant="contained" color="error" onClick={SupprimerPoint} disabled={selectedMarker === null}
                        sx={{ bottom: "-20px"}}
                >
                    Supprimer un point
                </Button>
            </Stack>
        </Box>
    );
};
