import { LargeCategoryAttributes } from '../src/models/large_category';
import { MiddleCategoryAttributes } from '../src/models/middle_category';

export type ResponseLargeCategories = {
  large_categories: (LargeCategoryAttributes & {
    middle_categories: MiddleCategoryAttributes[]
  })[],
}
