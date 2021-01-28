import faker from 'faker';

export interface UserCar {
  plateNumber: string;
  brand: string;
  model: string;
  color: string;
  year: string;
}

const getCar = (): UserCar => {
  const car = faker.vehicle.vehicle().split(' ');
  return {
    brand: car[0],
    color: faker.vehicle.color(),
    model: car[1],
    plateNumber: faker.vehicle.vin().slice(0, 5),
    year: faker.date.past(20).getFullYear().toString(),
  };
};

export default getCar;
