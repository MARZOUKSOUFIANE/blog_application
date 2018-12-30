import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: any[];
  constructor() {
    this.users = new Array(100)
      .fill(1)
      .map((e, i) => {
        return {
          id: i + 1,
          name : faker.name.findName(),
          email : faker.internet.email(),
          jobTitle: faker.name.jobTitle(),
          jobType: faker.name.jobType(),
          image: faker.image.avatar(),
          paragraphs: faker.lorem.paragraphs(),
          date: faker.date.past(10),
        };
      });
  }
  getAll() {
    return this.users;
  }
  getUserById(userId: number) {
    return this.users.find(e => e.id === Number(userId));
  }
  remove(userId) {
    const userIndex = this.users.findIndex(e => e.id === userId);
    this.users.splice(userIndex, 1);
    return this.getUserById(userId);
  }
  addUser(createUserDto: CreateUserDto) {
    const user = {
      id: this.generateId(),
      name: createUserDto.name,
      email: createUserDto.email,
      jobTitle: createUserDto.jobTile,
      jobType: createUserDto.jobType,
      image: createUserDto.image,
      paragraphs: createUserDto.paragraphs,
        date: createUserDto.date,
    };
    this.users.push(user);
    return user;
  }
  private generateId() {
    return this.users.length > 0 ?
      Math.max(...this.users.map(e => e.id)) + 1 :
      1;
  }
}
