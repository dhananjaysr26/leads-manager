import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '[Leads Manager API Services]: I am Running!';
  }
}
