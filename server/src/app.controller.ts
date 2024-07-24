import { multerOptions } from './configs/uploadConfig';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email/email.service';
import { UsersService } from './users/users.service';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Post('/single')
  getHello(@UploadedFile() file) {
    return file;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  @Post('/array')
  getHello1(@UploadedFiles() file) {
    return file;
  }

  @Get('/send')
  send() {
    const code = 'ok';
    this.emailService.sendEmail({
      to: 'alik.gevorgyan1089@gmail.com',
      subject: 'ok',
      html: code,
    });
    return 'ok';
  }
}
