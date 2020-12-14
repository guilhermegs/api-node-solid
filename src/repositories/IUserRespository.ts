import { User } from "../entities/User";

export interface IUserRespository {
    findByEmail(email: string): Promise<User>
    save(user: User): Promise<void>
}