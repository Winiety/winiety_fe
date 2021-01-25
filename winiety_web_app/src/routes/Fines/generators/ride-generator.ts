import faker from 'faker';

export interface UserRide {
  plateNumber: string;
  rideDateTime: number;
}

const getComplaint = (): UserRide => {
  return {
    plateNumber: faker.vehicle.vin().slice(0, 5),
    rideDateTime: faker.random.number(50),
  };
};

export default getComplaint;
