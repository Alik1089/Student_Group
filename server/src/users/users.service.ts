import { Teacher } from './../teacher/entities/teacher.entity';
import { Student } from './../student/entities/student.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Role } from './entities/role.enum';
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, 
    @InjectRepository(Student) private studentRepository:Repository<Student>,
    @InjectRepository(Teacher) private teacherRepository:Repository<Teacher>,
    @InjectRepository(Group) private groupRepository:Repository<Group>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, surname, password, email, age, role, phoneNumber, salary, groupId } = createUserDto;

      const newUser = await this.userRepository.findOne({ where: { email } });
      if (newUser) {
        return `${email} is already exist`;
      }

      const emailToken = uuid();
      console.log();
      const user = await this.userRepository.save({
        name,
        surname,
        email,
        age,
        password: bcrypt.hashSync(password, 10),
        // picture: req.file?.filename,
        role,
        emailToken,
        phoneNumber,
      });

      if (role == Role.STUDENT) {
        const group = await this.groupRepository.findOneBy({id:groupId})
        if(group){
          const student = await this.studentRepository.save({
            userId: user.id,
            group
          });
          console.log(student);
        }else{
          return 'group not found'
        }
      } else if (role == Role.TEACHER) {
        const teacher = await this.teacherRepository.save({
          userId: user.id,
          salary
        });
        console.log(teacher);
      }
      return user;
    } catch (e) {
      throw new BadRequestException('Oopsss');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async teacherFindAll(){
    return await this.teacherRepository.find()
  }

  async studentsFindAll(){
    return await this.studentRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async findOneEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove11(id: number) {
    return await this.userRepository.delete(id);
  }
}
