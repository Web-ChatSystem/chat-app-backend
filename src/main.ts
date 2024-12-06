import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Web chat API")
    .setDescription("API description for web chat application")
    .setVersion("1.0")
    .addTag("Chat")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: ["http://localhost:5173", "https://chat-app-frontend-v2-9xdq.vercel.app"],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
