export type Place = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      type: 'Point';
      coordinates: Coordinates;
    };
  };
  media: {
    type: 'image' | 'video' | string;
    url: string;
    _id: string;
  }[];
  likes: string[];
  rating: {
    count: number;
    average: number;
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isFavorite: boolean;
};

export type Coordinates = [number, number]; // [longitude, latitude]