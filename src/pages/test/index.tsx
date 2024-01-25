import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';

function Test() {
  const PriceList = ['가격이 낮은 순', '가격이 높은 순'];

  const FilterList = ['예약 신청', '예약 취소', '예약 승인', '예약 거절', '체험 완료'];

  return (
    <div>
      <FilterDropDown type="가격" lists={PriceList} />
      <FilterDropDown type="필터" lists={FilterList} />
    </div>
  );
}
export default Test;
