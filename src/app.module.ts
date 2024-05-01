import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LeadsDataModule } from './leads-data/leads-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    UsersModule,
    AuthModule,
    LeadsDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
