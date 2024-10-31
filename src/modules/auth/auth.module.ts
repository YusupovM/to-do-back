import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from '@src/modules/auth/auth.controller';
import { User } from '@src/modules/users/user.model';
import { AuthService } from '@src/modules/auth/auth.service';
import { UsersModule } from '@src/modules/users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY || 'SECRET',
    }),
    UsersModule,
  ],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {
}
