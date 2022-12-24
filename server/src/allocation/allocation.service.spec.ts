import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { ValidationError } from 'apollo-server-express';
import { Customer } from 'customer/customer.entity';
import { CustomerService } from 'customer/customer.service';
import { Allocation } from './allocation.entity';
import { AllocationRepository } from './allocation.repository';
import { AllocationService } from './allocation.service';

describe('AllocationService', () => {
  let allocationService: AllocationService;
  let customerService: CustomerService;
  let allocationRepository: AllocationRepository;

  const mockedAllocation = new Allocation();
  mockedAllocation.id = 1;
  mockedAllocation.customerId = 1;
  mockedAllocation.name = 'stocks';
  mockedAllocation.amount = 200;
  mockedAllocation.target = 0.75;
  const mockedCustomer = new Customer();
  mockedCustomer.id = 1;
  mockedCustomer.username = 'test';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AllocationService],
    })
      .useMocker(createMock)
      .compile();

    allocationService = module.get<AllocationService>(AllocationService);
    customerService = module.get<CustomerService>(CustomerService);
    allocationRepository =
      module.get<AllocationRepository>(AllocationRepository);
  });

  it('resolver should be defined', () => {
    expect(allocationService).toBeDefined();
  });

  describe('createAllocation', () => {
    it('should return an allocation object', async () => {
      const result = new Allocation();

      jest.spyOn(allocationRepository, 'save').mockResolvedValue(result);

      expect(
        await allocationService.createAllocation(mockedAllocation),
      ).toStrictEqual(result);
    });

    it('should throw an ValidationError when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(false);

      try {
        await allocationService.createAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e).toStrictEqual(
          new ValidationError(
            `Customer with id: '${mockedAllocation.customerId}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an ValidationError when allocation exists already', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'nameExists').mockResolvedValue(true);

      try {
        await allocationService.createAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e).toStrictEqual(
          new ValidationError(
            `Allocation '${mockedAllocation.name}' already exists for customer ${mockedAllocation.customerId}.`,
          ),
        );
      }
    });

    it('should throw an Error when repository create fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'nameExists').mockResolvedValue(false);
      jest.spyOn(allocationRepository, 'create').mockImplementation(() => {
        throw new Error('create repository error');
      });

      try {
        await allocationService.createAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while creating allocation with name: ${mockedAllocation.name} in Allocation Table`,
          ),
        );
      }
    });

    it('should throw an Error when repository create fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'nameExists').mockResolvedValue(false);
      jest
        .spyOn(allocationRepository, 'create')
        .mockReturnValue(mockedAllocation);
      jest.spyOn(allocationRepository, 'save').mockImplementation(() => {
        throw new Error('save repository error');
      });

      try {
        await allocationService.createAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while saving allocation with name: ${mockedAllocation.name} in Allocation Table`,
          ),
        );
      }
    });
  });

  describe('getAllocations', () => {
    it('should return a collection of allocations', async () => {
      const result = [new Allocation()];

      jest.spyOn(allocationRepository, 'find').mockResolvedValue(result);

      expect(
        await allocationService.getAllocations(mockedAllocation),
      ).toStrictEqual(result);
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(allocationRepository, 'find').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await allocationService.getAllocations(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while retrieving allocations with customerId: ${mockedAllocation.customerId} in Allocation Table`,
          ),
        );
      }
    });
  });

  describe('getAllocation', () => {
    it('should return an allocation object', async () => {
      const result = new Allocation();

      jest.spyOn(allocationRepository, 'findOne').mockResolvedValue(result);

      expect(
        await allocationService.getAllocation(mockedAllocation),
      ).toStrictEqual(result);
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(allocationRepository, 'findOne').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await allocationService.getAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while retrieving allocation with name: ${mockedAllocation.name} in Allocation Table`,
          ),
        );
      }
    });
  });

  describe('updateAllocation', () => {
    it('should return an allocation object', async () => {
      const result = new Allocation();

      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'allocationExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'getAllocation').mockResolvedValue(result);

      expect(
        await allocationService.updateAllocation(mockedAllocation),
      ).toStrictEqual(result);
    });

    it('should throw an Error when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(false);

      try {
        await allocationService.updateAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Customer with id: '${mockedAllocation.customerId}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest
        .spyOn(allocationService, 'allocationExists')
        .mockResolvedValue(false);

      try {
        await allocationService.updateAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Allocation with id: '${mockedAllocation.id}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'allocationExists').mockResolvedValue(true);
      jest.spyOn(allocationRepository, 'update').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await allocationService.updateAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while updating allocation with name: ${mockedAllocation.name} in Allocation Table`,
          ),
        );
      }
    });
  });

  describe('deleteAllocation', () => {
    it('should return true if deletion is sucessfull', async () => {
      const result = true;

      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'allocationExists').mockResolvedValue(true);

      expect(
        await allocationService.deleteAllocation(mockedAllocation),
      ).toStrictEqual(result);
    });

    it('should throw an Error when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(false);

      try {
        await allocationService.deleteAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Customer with id: '${mockedAllocation.customerId}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest
        .spyOn(allocationService, 'allocationExists')
        .mockResolvedValue(false);

      try {
        await allocationService.deleteAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Allocation with id: '${mockedAllocation.id}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(allocationService, 'allocationExists').mockResolvedValue(true);
      jest.spyOn(allocationRepository, 'delete').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await allocationService.deleteAllocation(mockedAllocation);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while deleting allocation with id: ${mockedAllocation.id} in Allocation Table`,
          ),
        );
      }
    });
  });

  describe('getAllocationsTotalAmount', () => {
    it('should return 400', async () => {
      const result = 400;

      const allocationMock = new Allocation();
      allocationMock.amount = 200;
      const allocations = [allocationMock, allocationMock];

      jest
        .spyOn(allocationService, 'getAllocations')
        .mockResolvedValue(allocations);

      expect(
        await allocationService.getAllocationsTotalAmount(mockedAllocation),
      ).toStrictEqual(result);
    });
  });

  describe('allocationExists', () => {
    it('should return true when allocation exists', async () => {
      const result = true;

      jest
        .spyOn(allocationRepository, 'find')
        .mockResolvedValue([mockedAllocation]);

      expect(
        await allocationService.allocationExists(mockedAllocation),
      ).toStrictEqual(result);
    });

    it('should return false when allocation does not exists', async () => {
      const result = false;

      jest.spyOn(allocationRepository, 'find').mockResolvedValue([]);

      expect(
        await allocationService.allocationExists(mockedAllocation),
      ).toStrictEqual(result);
    });
  });

  describe('nameExists', () => {
    it('should return true when allocation name exists', async () => {
      const result = true;

      jest
        .spyOn(allocationRepository, 'find')
        .mockResolvedValue([mockedAllocation]);

      expect(
        await allocationService.nameExists(mockedAllocation),
      ).toStrictEqual(result);
    });

    it('should return false when allocation name does not exists', async () => {
      const result = false;

      jest.spyOn(allocationRepository, 'find').mockResolvedValue([]);

      expect(
        await allocationService.nameExists(mockedAllocation),
      ).toStrictEqual(result);
    });
  });

  describe('getCustomer', () => {
    it('should return customer', async () => {
      const result = mockedCustomer;

      jest.spyOn(customerService, 'getCustomer').mockResolvedValue(result);

      expect(
        await allocationService.getCustomer(mockedCustomer.id),
      ).toStrictEqual(result);
    });
  });
});
