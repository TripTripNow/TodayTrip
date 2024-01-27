import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import { FILTER_LIST, PRICE_LIST } from '@/constants/dropdown';

function Test() {
  return (
    <div>
      <FilterDropDown type="가격" lists={PRICE_LIST} />
      <FilterDropDown type="필터" lists={FILTER_LIST} />
    </div>
  );
}
export default Test;
