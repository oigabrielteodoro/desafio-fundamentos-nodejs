import { isUuid } from 'uuidv4';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!isUuid(id)) {
      throw new AppError('Invalid the transaction id');
    }

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('The transaction not found in database');
    }

    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
