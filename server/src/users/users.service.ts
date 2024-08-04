import { EmailService } from './../email/email.service';
import { IUloadImage } from './../types/index';
import { Teacher } from './../teacher/entities/teacher.entity';
import { Student } from './../student/entities/student.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  EmailDto,
  UpdateUserDto,
  ChangePasswordDto,
  ChangeNameSurnameDto,
} from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Role } from './entities/role.enum';
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private readonly emailService: EmailService,
  ) {}

  async create(req, createUserDto: CreateUserDto) {
    try {
      const {
        name,
        surname,
        password,
        email,
        age,
        role,
        phoneNumber,
        salary,
        groupId,
      } = createUserDto;

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
        picture: req.file?.filename,
        role,
        emailToken,
        phoneNumber,
      });

      if (role == Role.STUDENT) {
        const group = await this.groupRepository.findOneBy({ id: groupId });
        if (group) {
          const student = await this.studentRepository.save({
            userId: user.id,
            group,
          });
          console.log(student);
        } else {
          return 'group not found';
        }
      } else if (role == Role.TEACHER) {
        const teacher = await this.teacherRepository.save({
          userId: user.id,
          salary,
        });
        console.log(teacher);
      }
      return user;
    } catch (e) {
      throw new BadRequestException('Oopsss');
    }
  }

  async findAll(role: number) {
    if (role) {
      return await this.userRepository.find({
        where: {
          role,
        },
        relations: {
          teacher: true,
          student: {
            group: true,
          },
        },
        select: {
          name: true,
          surname: true,
          age: true,
          email: true,
          image: true,
          phoneNumber: true,
          role: true,
        },
      });
    } else {
      return await this.userRepository.find({
        relations: {
          teacher: true,
          student: {
            group: true,
          },
        },
        select: {
          name: true,
          surname: true,
          age: true,
          email: true,
          id:true,
          image: true,
          phoneNumber: true,
          role: true,
        },
      });
    }
  }

  async teacherFindAll() {
    return await this.teacherRepository.find();
  }

  async studentsFindAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: number) {
    const user =  await this.userRepository.findOne({ where: { id } });
    if(user){
      return user
    }else{
      return "User id is wrong"
    }
  }
  async findOneEmail(emailDto: EmailDto) {
    const { email } = emailDto;
    return await this.userRepository.findOne({ where: { email: email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updatepicture(id: number, file: IUloadImage) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      await this.userRepository.update(user, { image: file.filename });
      return file;
    } else {
      return 'User is not found ';
    }
  }

  async forgetPassword(email: string) {
    console.log(email);
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      const code = Math.floor(Math.random() * 90000 + 10000);
      this.emailService.sendEmail({
        to: email,
        subject: 'forgetPassword...',
        html: `<h1 style="color:#0aa">${code}</h1>`,
      });
      await this.userRepository.update(user.id, { emailToken: code + '' });
      console.log(user);

      return 'user';
    } else {
      return 'User not found';
    }
  }

  async resetPassword(email, forgetPassword) {
    const { code, password, confirmPassword } = forgetPassword;
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      if (user.emailToken == code) {
        await this.userRepository.update(user.id, {
          password: bcrypt.hashSync(password, 10),
          emailToken: '',
        });
        return 'Password is changed ';
      } else {
        return 'User email is wrong';
      }
    }
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      if (bcrypt.compareSync(oldPassword, user.password)) {
        await this.userRepository.update(user.id, {
          password: bcrypt.hashSync(newPassword, 10),
        });
        return true;
      } else {
        return false;
      }
    } else {
      return ' User is not found ';
    }
  }

  async changeNameSurname(
    id: number,
    changeNameSurnameDto: ChangeNameSurnameDto,
  ) {
    const { name, surname } = changeNameSurnameDto;
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      await this.userRepository.update(user.id, {
        name,
        surname,
      });
    } else {
      return ' User is not found ';
    }
  }

  async remove11(id: number, role:number) {
    await this.userRepository.delete(id);
    return await this.findAll(role);
  }
}
