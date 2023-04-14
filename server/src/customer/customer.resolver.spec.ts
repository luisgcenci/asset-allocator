import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { AssetClass } from 'asset_class/asset_class.entity';
import { ValidationError } from 'apollo-server-express';
import { Customer } from './customer.entity';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';

describe('CustomerResolver', () => {
  let customerResolver: CustomerResolver;
  let customerService: CustomerService;

  const mockedCustomer = new Customer();
  mockedCustomer.username = 'jest';
  mockedCustomer.id = 1;
  const assetClass = new AssetClass();
  assetClass.id = 1;
  assetClass.customerId = 293;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CustomerResolver],
    })
      .useMocker(createMock)
      .compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerResolver = module.get<CustomerResolver>(CustomerResolver);
  });

  it('resolver should be defined', () => {
    expect(customerResolver).toBeDefined();
  });

  it('createCustomer should return a customer object', async () => {
    const result = mockedCustomer;

    jest.spyOn(customerService, 'createCustomer').mockResolvedValue(result);
    expect(await customerResolver.createCustomer(mockedCustomer)).toStrictEqual(
      result,
    );
  });

  it('customers shoudl return array of customer objects', async () => {
    const result = [mockedCustomer, mockedCustomer];

    jest.spyOn(customerService, 'getAllCustomers').mockResolvedValue(result);
    expect(await customerResolver.customers()).toStrictEqual(result);
  });

  describe('customer', () => {
    it('should return a customer objcet', async () => {
      const result = mockedCustomer;

      jest.spyOn(customerService, 'getCustomer').mockResolvedValue(result);
      expect(await customerResolver.customer(mockedCustomer)).toStrictEqual(
        result,
      );
    });

    it('should throw validation error when customer doesnt exists', async () => {
      jest.spyOn(customerService, 'getCustomer').mockResolvedValue(null);

      try {
        await customerResolver.customer(mockedCustomer);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e).toStrictEqual(
          new ValidationError(`Customer id ${mockedCustomer.id} doesn't exist`),
        );
      }
    });
  });

  it('allocations should return collection of Allocations', async () => {
    const result = [assetClass, assetClass];

    jest.spyOn(customerService, 'getAssetClasses').mockResolvedValue(result);
    expect(await customerResolver.assetClasses(mockedCustomer)).toStrictEqual(
      result,
    );
  });
});
