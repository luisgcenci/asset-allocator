import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { Allocation } from 'allocation/allocation.entity';
import { AllocationService } from 'allocation/allocation.service';
import { ValidationError } from 'apollo-server-express';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let allocationService: AllocationService;
  let customerRepository: CustomerRepository;

  const mockedCustomer = new Customer();
  mockedCustomer.username = 'jest';
  mockedCustomer.id = 1;
  const mockedAllocation = new Allocation();
  mockedAllocation.id = 12;
  mockedAllocation.customerId = 999;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CustomerService],
    })
      .useMocker(createMock)
      .compile();

    customerService = module.get<CustomerService>(CustomerService);
    allocationService = module.get<AllocationService>(AllocationService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  it('resolver should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should return a customer object', async () => {
      const result = mockedCustomer;

      jest.spyOn(customerService, 'usernameExists').mockResolvedValue(false);
      jest.spyOn(customerService, 'getCustomer').mockResolvedValue(null);
      jest.spyOn(customerRepository, 'save').mockResolvedValue(result);
      jest.spyOn(customerRepository, 'save').mockResolvedValue(result);

      expect(
        await customerService.createCustomer(mockedCustomer),
      ).toStrictEqual(result);
    });

    it('should throw an ValidationError when username already exists', async () => {
      jest.spyOn(customerService, 'usernameExists').mockResolvedValue(true);

      try {
        await customerService.createCustomer(mockedCustomer);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e).toStrictEqual(
          new ValidationError(
            `Customer with username: '${mockedCustomer.username}' already exists.`,
          ),
        );
      }
    });

    it('should throw an Error when repository create fails', async () => {
      jest.spyOn(customerService, 'usernameExists').mockResolvedValue(false);
      jest.spyOn(customerRepository, 'create').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await customerService.createCustomer(mockedCustomer);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while creating customer with username: '${mockedCustomer.username}' in Customer Table`,
          ),
        );
      }
    });

    it('should throw an Error when repository save fails', async () => {
      jest.spyOn(customerService, 'usernameExists').mockResolvedValue(false);
      jest.spyOn(customerRepository, 'create').mockReturnValue(mockedCustomer);
      jest.spyOn(customerRepository, 'save').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await customerService.createCustomer(mockedCustomer);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while saving customer with username: '${mockedCustomer.username}' in Customer Table`,
          ),
        );
      }
    });
  });

  describe('getAllCustomers', () => {
    it('should return an array of allocation object', async () => {
      const customer = new Customer();
      const result = [customer, customer];

      jest.spyOn(customerRepository, 'findAll').mockResolvedValue(result);

      expect(await customerService.getAllCustomers()).toStrictEqual(result);
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(customerRepository, 'findAll').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await customerService.getAllCustomers();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(`Error while retrieving all customers in Customer Table`),
        );
      }
    });
  });

  describe('getCustomer', () => {
    it('should return a customer object', async () => {
      const result = new Customer();

      jest.spyOn(customerRepository, 'find').mockResolvedValue(result);

      expect(await customerService.getCustomer(mockedCustomer)).toStrictEqual(
        result,
      );
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(customerRepository, 'find').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await customerService.getCustomer(mockedCustomer);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while getting Customer with id: ${mockedCustomer.id} in Customer Table`,
          ),
        );
      }
    });
  });

  describe('customerExists', () => {
    it('should return true when customer exists', async () => {
      const result = true;

      jest.spyOn(customerRepository, 'find').mockResolvedValue(mockedCustomer);

      expect(
        await customerService.customerExists(mockedCustomer),
      ).toStrictEqual(result);
    });

    it('should return false when customer does not exists', async () => {
      const result = false;

      jest.spyOn(customerRepository, 'find').mockResolvedValue(null);

      expect(
        await customerService.customerExists(mockedCustomer),
      ).toStrictEqual(result);
    });
  });

  describe('usernameExists', () => {
    it('should return true when username exists', async () => {
      const result = true;

      jest.spyOn(customerRepository, 'find').mockResolvedValue(mockedCustomer);

      expect(
        await customerService.usernameExists(mockedCustomer),
      ).toStrictEqual(result);
    });

    it('should return false when username does not exists', async () => {
      const result = false;

      jest.spyOn(customerRepository, 'find').mockResolvedValue(null);

      expect(
        await customerService.usernameExists(mockedCustomer),
      ).toStrictEqual(result);
    });
  });

  describe('getAllocations', () => {
    it('should return collection of allocations', async () => {
      const result = [mockedAllocation, mockedAllocation];

      jest.spyOn(allocationService, 'getAllocations').mockResolvedValue(result);

      expect(
        await customerService.getAllocations(mockedCustomer.id),
      ).toStrictEqual(result);
    });
  });
});
