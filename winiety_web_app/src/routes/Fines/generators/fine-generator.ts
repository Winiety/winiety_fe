import faker from 'faker';

export interface UserFine {
  cost: string;
  description: string;
  createTime: string;
}

const getComplaint = (): UserFine => {
  return {
    description: faker.lorem.sentence(15, 5),
    cost: faker.commerce.price(),
    createTime: faker.date.between('2010-01-01', '2015-01-01').toDateString(),
  };
};

export default getComplaint;
