import { AppDataSource } from '../../data-source';
import { User } from '../users/user.entity';
import { HederaService } from '../hedera/hedera.service';

async function main() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const hederaService = new HederaService();

  const creators = await userRepo.find({ where: { role: 'creator' } });
  for (const user of creators) {
    if (!user.hederaAccountId) {
      const { accountId, privateKey } = await hederaService.createHederaAccount();
      user.hederaAccountId = accountId;
      user.hederaPrivateKey = privateKey;
      await userRepo.save(user);
      console.log(`Hedera account created for ${user.email}: ${accountId}`);
    }
  }

  await AppDataSource.destroy();
}

main();
