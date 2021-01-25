import faker from 'faker';

export interface UserFine {
  id: number;
  rideId: number;
  pictureId: number;
  plateNumber: string;
  cost: number;
  description: string;
  createTime: string;
  userId: number;
}

const getFine = (): UserFine => {
  return {
    id: faker.random.number(50),
    rideId: faker.random.number(50),
    pictureId: faker.random.number(50),
    plateNumber: faker.vehicle.vin().slice(0, 5),
    cost: faker.random.number(500),
    description: faker.lorem.sentence(15, 5),
    createTime: faker.date.between('2010-01-01', '2015-01-01').toISOString(),
    userId: faker.random.number(50),
  };
};

export default getFine;
