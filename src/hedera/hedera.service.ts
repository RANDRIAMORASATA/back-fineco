import { Injectable } from '@nestjs/common';
import {
  AccountId,
  PrivateKey,
  Client,
  TransferTransaction,
  Hbar,
  AccountCreateTransaction,
} from '@hashgraph/sdk';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class HederaService {
  private client: Client;

  constructor() {
    const operatorId = process.env.HEDERA_OPERATOR_ID;
    const operatorKey = process.env.HEDERA_OPERATOR_KEY;

    if (!operatorId || !operatorKey) {
      throw new Error('HEDERA_OPERATOR_ID or HEDERA_OPERATOR_KEY not set in .env');
    }

    this.client = Client.forTestnet()
      .setOperator(AccountId.fromString(operatorId), PrivateKey.fromString(operatorKey));
  }

  /**
   * 🪙 Crée un nouveau compte Hedera
   */
  async createHederaAccount() {
    try {
      const privateKey = PrivateKey.generateED25519();
      const publicKey = privateKey.publicKey;

      const txResponse = await new AccountCreateTransaction()
        .setKey(publicKey)
        .setInitialBalance(new Hbar(5)) // 5 HBAR pour commencer
        .execute(this.client);

      const receipt = await txResponse.getReceipt(this.client);
      const newAccountId = receipt.accountId?.toString();

      if (!newAccountId) {
        throw new Error('Impossible de créer le compte Hedera');
      }

      console.log(`✅ Compte Hedera créé : ${newAccountId}`);

      return {
        accountId: newAccountId,
        privateKey: privateKey.toStringRaw(),
      };
    } catch (error) {
      console.error('Erreur création compte Hedera:', error);
      throw error;
    }
  }

  /**
   * 💸 Envoie des tokens HBAR entre comptes
   */
  async sendTokens(receiverAccountId: string, amount: number) {
    try {
      const transaction = await new TransferTransaction()
        .addHbarTransfer(this.client.operatorAccountId!, new Hbar(-amount))
        .addHbarTransfer(receiverAccountId, new Hbar(amount))
        .execute(this.client);

      const receipt = await transaction.getReceipt(this.client);
      console.log('✅ Transaction envoyée, statut :', receipt.status.toString());

      return {
        message: 'Investissement réussi !',
        status: receipt.status.toString(),
        transactionId: transaction.transactionId.toString(),
      };
    } catch (error) {
      console.error('Erreur envoi de tokens Hedera:', error);
      throw error;
    }
  }
}
