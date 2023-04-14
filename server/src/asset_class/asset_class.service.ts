import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { AssetClass } from 'asset_class/asset_class.entity';
import {
  AssetClassExistsInput,
  AssetClassNameExistsInput,
  CalculateInput,
  CreateAssetClassInput,
  DeleteAssetClassInput,
  GetAssetClassInput,
  GetAssetClassesInput,
  UpdateAssetClassInput,
} from './dto/asset_class.dto';
import { AssetClassRepository } from './asset_class.repository';
import { ValidationError } from 'apollo-server-express';
import { CustomerService } from 'customer/customer.service';
import { Customer } from 'customer/customer.entity';

/**
 * Asset Class Service
 */
@Injectable()
export class AssetClassService {
  private logger: Logger;

  /**
   * Constructor for Asset Allocation Service
   * @param assetClassRepository Injected Allocation Repository
   */
  constructor(
    @Inject(AssetClassRepository)
    private assetClassRepository: AssetClassRepository,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService,
  ) {
    this.logger = new Logger();
  }

  /**
   * Creates an asset class
   * @param createAllocationInput Input
   * @returns Asset Class created
   */
  async createAssetClass(
    createAssetClassInput: CreateAssetClassInput,
  ): Promise<AssetClass> {
    const customerExists = await this.customerService.customerExists({
      id: createAssetClassInput.customerId,
    });

    if (!customerExists)
      throw new ValidationError(
        `Customer with id: '${createAssetClassInput.customerId}' doesn't exists.`,
      );

    const assetClassNameExists = await this.nameExists(createAssetClassInput);

    if (assetClassNameExists)
      throw new ValidationError(
        `Asset Class '${createAssetClassInput.name}' already exists for customer ${createAssetClassInput.customerId}.`,
      );

    let assetClass: AssetClass;

    try {
      assetClass = this.assetClassRepository.create(createAssetClassInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while creating asset class with name: ${createAssetClassInput.name} in asset_class Table`,
      );
    }

    try {
      return this.assetClassRepository.save(assetClass);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while saving asset class with name: ${assetClass.name} in asset_class Table`,
      );
    }
  }

  /**
   * Gets all asset classes
   * @param getAssetClassesInput Input
   * @returns Collection of asset classes
   */
  async getAssetClasses(
    getAssetClassesInput: GetAssetClassesInput,
  ): Promise<AssetClass[]> {
    try {
      return this.assetClassRepository.find(getAssetClassesInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while retrieving asset classes with customerId: ${getAssetClassesInput.customerId} ` +
          `in asset_class Table`,
      );
    }
  }

  /**
   * Gets an asset class
   * @param getAssetClassInput Input
   * @returns An AssetClass
   */
  async getAssetClass(
    getAssetClassInput: GetAssetClassInput,
  ): Promise<AssetClass> {
    try {
      return this.assetClassRepository.findOne(getAssetClassInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while retrieving asset class with name: ${getAssetClassInput.name} in asset_class Table`,
      );
    }
  }

  /**
   * Updates an asset class
   * @param updateAssetClassInput input
   * @returns Asset Class updated
   */
  async updateAssetClass(
    updateAssetClassInput: UpdateAssetClassInput,
  ): Promise<AssetClass> {
    const customerExists = await this.customerService.customerExists({
      id: updateAssetClassInput.customerId,
    });

    if (!customerExists)
      throw new ValidationError(
        `Customer with id: '${updateAssetClassInput.customerId}' doesn't exists.`,
      );

    const assetClassExists = await this.assetClassExists({
      customerId: updateAssetClassInput.customerId,
      id: updateAssetClassInput.id,
    });

    if (!assetClassExists)
      throw new ValidationError(
        `Asset Class with id: '${updateAssetClassInput.id}' doesn't exists.`,
      );

    try {
      await this.assetClassRepository.update(updateAssetClassInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while updating asset class with name: ${updateAssetClassInput.name} in asset_class Table`,
      );
    }

    return this.getAssetClass(updateAssetClassInput);
  }

  /**
   * Deletes an asset class
   * @param deleteAssetClassInput Input
   * @returns true if deletion was sucessfull
   */
  async deleteAssetClass(
    deleteAssetClassInput: DeleteAssetClassInput,
  ): Promise<boolean> {
    const customerExists = await this.customerService.customerExists({
      id: deleteAssetClassInput.customerId,
    });

    if (!customerExists)
      throw new ValidationError(
        `Customer with id: '${deleteAssetClassInput.customerId}' doesn't exists.`,
      );

    const assetClassExists = await this.assetClassExists(deleteAssetClassInput);

    if (!assetClassExists)
      throw new ValidationError(
        `Asset Class with id: '${deleteAssetClassInput.id}' doesn't exists.`,
      );

    try {
      await this.assetClassRepository.delete(deleteAssetClassInput);
      return true;
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while deleting asset class with id: ${deleteAssetClassInput.id} in asset_class Table`,
      );
    }
  }

  /**
   * Sums all asset classes amounts
   * @param getAssetClassesInput Input
   * @returns Sum of asset classes amounts
   */
  async getAssetClassesTotalAmount(
    getAssetClassesInput: GetAssetClassesInput,
  ): Promise<number> {
    const assetClasses = await this.getAssetClasses(getAssetClassesInput);
    let sum = 0;

    assetClasses.forEach((a) => {
      sum += a.amount;
    });

    return sum;
  }

  /**
   * Checks if asset class exists
   * @param assetClassExistsInput Input
   * @returns true if asset class exists, false otherwise
   */
  async assetClassExists(
    assetClassExistsInput: AssetClassExistsInput,
  ): Promise<boolean> {
    const assetClasse = await this.assetClassRepository.find(
      assetClassExistsInput,
    );
    if (assetClasse.length > 0) return true;
    return false;
  }

  /**
   * Checks if asset class name exists
   * @param allocationExistsInput Input
   * @returns true if asset class name exists, false otherwise
   */
  async nameExists(
    assetClassNameExistsInput: AssetClassNameExistsInput,
  ): Promise<boolean> {
    const assetClass = await this.assetClassRepository.find(
      assetClassNameExistsInput,
    );
    if (assetClass.length > 0) return true;
    return false;
  }

  /**
   * Gets a customer
   * @param customerId Customer ID
   * @returns A customer
   */
  async getCustomer(customerId: number): Promise<Customer> {
    return await this.customerService.getCustomer({
      id: customerId,
    });
  }

  /**
   * Calculates where a new investment amount should be allocate to
   * for a given customer
   * @param calculateInput
   * @returns A list of allocations
   */
  async calculate(calculateInput: CalculateInput): Promise<AssetClass[]> {
    const currentAmount = await this.getAssetClassesTotalAmount({
      customerId: calculateInput.customerId,
    });
    const amountToInvest = calculateInput.amount;
    const amountToSimulate = currentAmount + amountToInvest;
    const assetClasses = await this.getAssetClasses({
      customerId: calculateInput.customerId,
    });

    assetClasses.forEach((ac) => {
      const currentAmount = ac.amount;

      /**
       * we only consider if a new investment should be made to an allocation
       * if the % of the allocation based on the total amount being simuldate
       * is less than its target % allocation
       */
      if (!(currentAmount / amountToSimulate >= ac.target)) {
        // a new investment to this allocation
        const maxNewAmount = amountToInvest * ac.target;
      }
    });

    return [new AssetClass()];
  }
}
