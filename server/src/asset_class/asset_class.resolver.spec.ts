import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { Customer } from 'customer/customer.entity';
import { AssetClass } from './asset_class.entity';
import { AssetClassResolver } from './asset_class.resolver';
import { AssetClassService } from './asset_class.service';

describe('AssetClassResolver', () => {
  let assetClassResolver: AssetClassResolver;
  let assetClassService: AssetClassService;

  const mockedAssetClass = new AssetClass();
  const mockedCustomer = new Customer();
  mockedCustomer.id = 1;
  mockedCustomer.username = 'username';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssetClassResolver],
    })
      .useMocker(createMock)
      .compile();

    assetClassService = module.get<AssetClassService>(AssetClassService);
    assetClassResolver = module.get<AssetClassResolver>(AssetClassResolver);
  });

  it('resolver should be defined', () => {
    expect(assetClassResolver).toBeDefined();
  });

  it('createAssetClass and updateAssetClass should return an Asset Class object', async () => {
    const result = new AssetClass();

    jest.spyOn(assetClassService, 'createAssetClass').mockResolvedValue(result);
    jest.spyOn(assetClassService, 'updateAssetClass').mockResolvedValue(result);

    expect(
      await assetClassResolver.createAssetClass(mockedAssetClass),
    ).toStrictEqual(result);

    expect(
      await assetClassResolver.updateAssetClass(mockedAssetClass),
    ).toStrictEqual(result);
  });

  it('assetClasses should return an array of asset class', async () => {
    const result = [new AssetClass(), new AssetClass()];

    jest.spyOn(assetClassService, 'getAssetClasses').mockResolvedValue(result);
    expect(
      await assetClassResolver.assetClasses(mockedAssetClass),
    ).toStrictEqual(result);
  });

  it('deleteAllocation should return true', async () => {
    const result = true;

    jest.spyOn(assetClassService, 'deleteAssetClass').mockResolvedValue(result);
    expect(
      await assetClassResolver.deleteAssetClass(mockedAssetClass),
    ).toStrictEqual(result);
  });

  it('allocationsTotalAmount should return 100', async () => {
    const result = 100;

    jest
      .spyOn(assetClassService, 'getAssetClassesTotalAmount')
      .mockResolvedValue(result);
    expect(
      await assetClassResolver.assetClassesTotalAmount(mockedAssetClass),
    ).toStrictEqual(result);
  });

  it('customer should return Customer', async () => {
    const result = mockedCustomer;

    jest.spyOn(assetClassService, 'getCustomer').mockResolvedValue(result);
    expect(await assetClassResolver.customer(mockedAssetClass)).toStrictEqual(
      result,
    );
  });
});
