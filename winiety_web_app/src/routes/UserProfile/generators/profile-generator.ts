import faker from 'faker';

interface UserProfile {
  birthYear: number;
  phone: string;
  country: string;
  city: string;
  street: string;
  flatNumber: string;
  zip: string;
}

const getProfile = (): UserProfile => ({
  birthYear: faker.date.past().getFullYear(),
  phone: faker.phone.phoneNumber('!##-!##-###'),
  country: faker.address.country(),
  city: faker.address.city(),
  flatNumber: faker.random.number({ min: 1, max: 100 }).toString(),
  street: faker.address.streetName(),
  zip: faker.address.zipCode('##-###'),
});

export default getProfile;
