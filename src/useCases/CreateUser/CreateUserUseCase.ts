import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRespository } from "../../repositories/IUserRespository";
import { IUseCase } from "../IUseCase";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase implements IUseCase<ICreateUserRequestDTO, void> {

    constructor(
        private userRepository: IUserRespository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = this.userRepository.findByEmail(data.email)

        if(userAlreadyExists){
            throw new Error('User alredy exists.')
        }

        const user = new User(data)
        await this.userRepository.save(user)

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'equipe@meuapp.com'
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        })
    }
}