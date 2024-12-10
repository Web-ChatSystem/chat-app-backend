import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  app.useWebSocketAdapter(new IoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle("Web chat API")
    .setDescription("API description for web chat application")
    .setVersion("1.0")
    .addTag("Chat")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: ["http://localhost:4173", "https://chat-app-frontend-v2-9xdq.vercel.app", "https://chat-app-frontend-v2.onrender.com", "https://chat-app-frontend-myn0.onrender.com", "https://www.hust-cv-thson-20210744-web-app.id.vn"],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
