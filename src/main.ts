import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from 'dotenv'; // 👈 qo'shish

dotenv.config(); // 👈 .env faylni yuklash
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("OnlineShop example")
    .setDescription("The OnlineShop API description")
    .setVersion("1.0")
    .addTag("OnlineShop ")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  const port = process.env.PORT || 4445;
  await app.listen(port, () => {
    console.log(`server running is http://localhost:${port}`);
  });
}
bootstrap();
