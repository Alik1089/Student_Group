import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/role.enum';

export const HasRoles = (...role: Role[]) => SetMetadata('role', role);