import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  // Inscription
  async signUp(user: { name: string; email: string; password: string }) {
    const exist = await this.userRepo.findOne({ where: { email: user.email } });
    if (exist) return { success: false, message: 'Utilisateur déjà existant' };

    const newUser = this.userRepo.create(user);
    await this.userRepo.save(newUser);

    return { success: true, message: 'Utilisateur ajouté avec succès', user: newUser };
  }

  // Connexion
  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email, password } });
    if (!user) return { success: false, message: 'Email ou mot de passe incorrect' };

    return { success: true, user };
  }

  // Rechercher utilisateur par id
  async findById(id: number) {
    return await this.userRepo.findOne({ where: { id } });
}
}
