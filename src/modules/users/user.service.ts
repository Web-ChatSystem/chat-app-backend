import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { User, Prisma } from "@prisma/client";
import { UpdateUserDto, CreateUserDto } from "./dtos";
import { brcyptHelper } from "src/utils/bcrypt";

@Injectable()
export class UserService {
    findOne(arg0: number) {
        throw new Error("Method not implemented.");
    }
    constructor(private prisma: PrismaService) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (
            !user ||
            !(await brcyptHelper.comparePassword(password, user.password))
        ) {
            throw new ForbiddenException('email or password not valid');
        }

        return user;
    }

    async getUser(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const users = await this.prisma.user.findMany({
            where: { email: data.email },
        });
        if (users.length) {
            throw new ForbiddenException('email already exists');
        }
        data.password = await brcyptHelper.hash(data.password);
        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(params: {
        id: string;
        data: UpdateUserDto;
    }): Promise<User> {
        const { id, data } = params;
        return this.prisma.user.update({
            data,
            where: { id },
        });
    }

    async deleteUser(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}