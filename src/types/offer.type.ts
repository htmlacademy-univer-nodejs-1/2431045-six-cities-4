export type Offer = {
    title: string;
    description: string;
    date: string;
    city: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
    previewImage: string;
    photos: string[];
    premium: boolean;
    favorite: boolean;
    rating: number;
    housingType: 'apartment' | 'house' | 'room' | 'hotel';
    rooms: number;
    guests: number;
    price: number;
    amenities: ('Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge')[];
    authorEmail: string;
    commentsCount: number;
    latitude: number;
    longitude: number;
}