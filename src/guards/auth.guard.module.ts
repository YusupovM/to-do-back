import { forwardRef, Module } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { AuthModule } from '@src/modules/auth/auth.module';

@Module({
  providers: [
    AuthGuard
  ],
  imports: [
    forwardRef(() => AuthModule),
  ],
  exports: [
    AuthGuard,
    forwardRef(() => AuthModule)
  ],
})
export class AuthGuardModule {
}
