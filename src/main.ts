import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4445
  await app.listen(port, () => {
    console.log(`server running is ${port}`);
  });
}
bootstrap();
