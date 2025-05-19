export interface LeafletMapComponent {
    addMarker(lat: number, lng: number, popupText: string): Promise<void>;
    moveTo(lat: number, lng: number): Promise<void>;
  }
  