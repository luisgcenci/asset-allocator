import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { ValidationError } from 'apollo-server-express';
import { Customer } from 'customer/customer.entity';
import { CustomerService } from 'customer/customer.service';
import { AssetClass } from './asset_class.entity';
import { AssetClassRepository } from './asset_class.repository';
import { AssetClassService } from './asset_class.service';

describe('AssetClassService', () => {
  let assetClassService: AssetClassService;
  let customerService: CustomerService;
  let allocationRepository: AssetClassRepository;

  const mockedAssetClass = new AssetClass();
  mockedAssetClass.id = 1;
  mockedAssetClass.customerId = 1;
  mockedAssetClass.name = 'stocks';
  mockedAssetClass.amount = 200;
  mockedAssetClass.target = 0.75;
  const mockedCustomer = new Customer();
  mockedCustomer.id = 1;
  mockedCustomer.username = 'test';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssetClassService],
    })
      .useMocker(createMock)
      .compile();

    assetClassService = module.get<AssetClassService>(AssetClassService);
    customerService = module.get<CustomerService>(CustomerService);
    allocationRepository =
      module.get<AssetClassRepository>(AssetClassRepository);
  });

  it('resolver should be defined', () => {
    expect(assetClassService).toBeDefined();
  });

  describe('createAllocation', () => {
    it('should return an asset class object', async () => {
      const result = new AssetClass();

      jest.spyOn(allocationRepository, 'save').mockResolvedValue(result);

      expect(
        await assetClassService.createAssetClass(mockedAssetClass),
      ).toStrictEqual(result);
    });

    it('should throw an ValidationError when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(false);

      try {
        await assetClassService.createAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e).toStrictEqual(
          new ValidationError(
            `Customer with id: '${mockedAssetClass.customerId}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an ValidationError when asset class exists already', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'nameExists').mockResolvedValue(true);

      try {
        await assetClassService.createAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e).toStrictEqual(
          new ValidationError(
            `Asset Class '${mockedAssetClass.name}' already exists for customer ${mockedAssetClass.customerId}.`,
          ),
        );
      }
    });

    it('should throw an Error when repository create fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'nameExists').mockResolvedValue(false);
      jest.spyOn(allocationRepository, 'create').mockImplementation(() => {
        throw new Error('create repository error');
      });

      try {
        await assetClassService.createAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while creating asset class with name: ${mockedAssetClass.name} in asset_class Table`,
          ),
        );
      }
    });

    it('should throw an Error when repository create fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'nameExists').mockResolvedValue(false);
      jest
        .spyOn(allocationRepository, 'create')
        .mockReturnValue(mockedAssetClass);
      jest.spyOn(allocationRepository, 'save').mockImplementation(() => {
        throw new Error('save repository error');
      });

      try {
        await assetClassService.createAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while saving asset class with name: ${mockedAssetClass.name} in asset_class Table`,
          ),
        );
      }
    });
  });

  describe('getAssetClasses', () => {
    it('should return a collection of asset classes', async () => {
      const result = [new AssetClass()];

      jest.spyOn(allocationRepository, 'find').mockResolvedValue(result);

      expect(
        await assetClassService.getAssetClasses(mockedAssetClass),
      ).toStrictEqual(result);
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(allocationRepository, 'find').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await assetClassService.getAssetClasses(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while retrieving asset classes with customerId: ${mockedAssetClass.customerId} ` +
              `in asset_class Table`,
          ),
        );
      }
    });
  });

  describe('getAssetClass', () => {
    it('should return an asset class object', async () => {
      const result = new AssetClass();

      jest.spyOn(allocationRepository, 'findOne').mockResolvedValue(result);

      expect(
        await assetClassService.getAssetClass(mockedAssetClass),
      ).toStrictEqual(result);
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(allocationRepository, 'findOne').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await assetClassService.getAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while retrieving asset class with name: ${mockedAssetClass.name} in asset_class Table`,
          ),
        );
      }
    });
  });

  describe('updateAssetClass', () => {
    it('should return an allocation object', async () => {
      const result = new AssetClass();

      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'assetClassExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'getAssetClass').mockResolvedValue(result);

      expect(
        await assetClassService.updateAssetClass(mockedAssetClass),
      ).toStrictEqual(result);
    });

    it('should throw an Error when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(false);

      try {
        await assetClassService.updateAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Customer with id: '${mockedAssetClass.customerId}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when asset class does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest
        .spyOn(assetClassService, 'assetClassExists')
        .mockResolvedValue(false);

      try {
        await assetClassService.updateAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Asset Class with id: '${mockedAssetClass.id}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'assetClassExists').mockResolvedValue(true);
      jest.spyOn(allocationRepository, 'update').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await assetClassService.updateAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while updating asset class with name: ${mockedAssetClass.name} in asset_class Table`,
          ),
        );
      }
    });
  });

  describe('deleteAssetClass', () => {
    it('should return true if deletion is sucessfull', async () => {
      const result = true;

      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'assetClassExists').mockResolvedValue(true);

      expect(
        await assetClassService.deleteAssetClass(mockedAssetClass),
      ).toStrictEqual(result);
    });

    it('should throw an Error when customer does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(false);

      try {
        await assetClassService.deleteAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Customer with id: '${mockedAssetClass.customerId}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when asset class does not exists', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest
        .spyOn(assetClassService, 'assetClassExists')
        .mockResolvedValue(false);

      try {
        await assetClassService.deleteAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          new ValidationError(
            `Asset Class with id: '${mockedAssetClass.id}' doesn't exists.`,
          ),
        );
      }
    });

    it('should throw an Error when repository fails', async () => {
      jest.spyOn(customerService, 'customerExists').mockResolvedValue(true);
      jest.spyOn(assetClassService, 'assetClassExists').mockResolvedValue(true);
      jest.spyOn(allocationRepository, 'delete').mockImplementation(() => {
        throw new Error('repository error');
      });

      try {
        await assetClassService.deleteAssetClass(mockedAssetClass);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toStrictEqual(
          Error(
            `Error while deleting asset class with id: ${mockedAssetClass.id} in asset_class Table`,
          ),
        );
      }
    });
  });

  describe('getAssetClassesTotalAmount', () => {
    it('should return 400', async () => {
      const result = 400;

      const allocationMock = new AssetClass();
      allocationMock.amount = 200;
      const allocations = [allocationMock, allocationMock];

      jest
        .spyOn(assetClassService, 'getAssetClasses')
        .mockResolvedValue(allocations);

      expect(
        await assetClassService.getAssetClassesTotalAmount(mockedAssetClass),
      ).toStrictEqual(result);
    });
  });

  describe('assetClassExists', () => {
    it('should return true when asset class exists', async () => {
      const result = true;

      jest
        .spyOn(allocationRepository, 'find')
        .mockResolvedValue([mockedAssetClass]);

      expect(
        await assetClassService.assetClassExists(mockedAssetClass),
      ).toStrictEqual(result);
    });

    it('should return false when asset class does not exists', async () => {
      const result = false;

      jest.spyOn(allocationRepository, 'find').mockResolvedValue([]);

      expect(
        await assetClassService.assetClassExists(mockedAssetClass),
      ).toStrictEqual(result);
    });
  });

  describe('nameExists', () => {
    it('should return true when asset class name exists', async () => {
      const result = true;

      jest
        .spyOn(allocationRepository, 'find')
        .mockResolvedValue([mockedAssetClass]);

      expect(
        await assetClassService.nameExists(mockedAssetClass),
      ).toStrictEqual(result);
    });

    it('should return false when asset class name does not exists', async () => {
      const result = false;

      jest.spyOn(allocationRepository, 'find').mockResolvedValue([]);

      expect(
        await assetClassService.nameExists(mockedAssetClass),
      ).toStrictEqual(result);
    });
  });

  describe('getCustomer', () => {
    it('should return customer', async () => {
      const result = mockedCustomer;

      jest.spyOn(customerService, 'getCustomer').mockResolvedValue(result);

      expect(
        await assetClassService.getCustomer(mockedCustomer.id),
      ).toStrictEqual(result);
    });
  });
});
