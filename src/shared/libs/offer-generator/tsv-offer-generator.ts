import dayjs from 'dayjs';
import { getRandomItem } from '../../helpers/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const date = getRandomItem(this.mockData.dates);
    const createdDate = dayjs(date).format('MM-DD-YYYY');

    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);

    const photos = JSON.stringify(getRandomItem(this.mockData.photos))

    const premium = getRandomItem(this.mockData.premium);
    const favorite = getRandomItem(this.mockData.favorite);
    const rating = getRandomItem(this.mockData.ratings);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const rooms = getRandomItem(this.mockData.rooms);
    const guests = getRandomItem(this.mockData.guests);
    const price = getRandomItem(this.mockData.prices);
    const amenities = JSON.stringify(getRandomItem(this.mockData.amenities));

    const user = getRandomItem(this.mockData.users);
    const author = JSON.stringify({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      type: user.userType
    });

    const commentsCount = getRandomItem(this.mockData.commentsCounts);

    const cityIndex = this.mockData.cities.indexOf(city);
    const coordinates = JSON.stringify(
      this.mockData.coordinates[cityIndex] || { latitude: 0, longitude: 0 }
    );

    const row = [
      title,
      description,
      createdDate,
      city,
      previewImage,
      photos,
      premium,
      favorite,
      rating,
      housingType,
      rooms,
      guests,
      price,
      amenities,
      author,
      commentsCount,
      coordinates
    ];

    return row.join('\t');
  }
}
