import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { Customer } from 'customer/customer.entity';
import { Allocation } from './allocation.entity';
import { AllocationResolver } from './allocation.resolver';
import { AllocationService } from './allocation.service';

describe('AllocationResolver', () => {
  let allocationResolver: AllocationResolver;
  let allocationService: AllocationService;

  const mockedAllocation = new Allocation();
  const mockedCustomer = new Customer();
  mockedCustomer.id = 1;
  mockedCustomer.username = 'username';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AllocationResolver],
    })
      .useMocker(createMock)
      .compile();

    allocationService = module.get<AllocationService>(AllocationService);
    allocationResolver = module.get<AllocationResolver>(AllocationResolver);
  });

  it('resolver should be defined', () => {
    expect(allocationResolver).toBeDefined();
  });

  it('createAllocation and updateAllocation should return an allocation object', async () => {
    const result = new Allocation();

    jest.spyOn(allocationService, 'createAllocation').mockResolvedValue(result);
    jest.spyOn(allocationService, 'updateAllocation').mockResolvedValue(result);

    expect(
      await allocationResolver.createAllocation(mockedAllocation),
    ).toStrictEqual(result);

    expect(
      await allocationResolver.updateAllocation(mockedAllocation),
    ).toStrictEqual(result);
  });

  it('allocations should return an array of allocation', async () => {
    const result = [new Allocation(), new Allocation()];

    jest.spyOn(allocationService, 'getAllocations').mockResolvedValue(result);
    expect(
      await allocationResolver.allocations(mockedAllocation),
    ).toStrictEqual(result);
  });

  it('deleteAllocation should return true', async () => {
    const result = true;

    jest.spyOn(allocationService, 'deleteAllocation').mockResolvedValue(result);
    expect(
      await allocationResolver.deleteAllocation(mockedAllocation),
    ).toStrictEqual(result);
  });

  it('allocationsTotalAmount should return 100', async () => {
    const result = 100;

    jest
      .spyOn(allocationService, 'getAllocationsTotalAmount')
      .mockResolvedValue(result);
    expect(
      await allocationResolver.allocationsTotalAmount(mockedAllocation),
    ).toStrictEqual(result);
  });

  it('customer should return Customer', async () => {
    const result = mockedCustomer;

    jest.spyOn(allocationService, 'getCustomer').mockResolvedValue(result);
    expect(await allocationResolver.customer(mockedAllocation)).toStrictEqual(
      result,
    );
  });
});
