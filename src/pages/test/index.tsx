import Dropdown from '@/components/DropDown/Dropdown';
import AddActivityButton from '@/components/common/Button/AddActivityButton';
import AuthButton from '@/components/common/Button/AuthButton';
import ReserveButton from '@/components/common/Button/ReserveButton';
import DatePickerInput from '@/components/common/DatePicker/DatePicker';

const lists = ['문화 예술', '식음료', '스포츠', '투어', '관광'];

function Test() {
  return (
    <div style={{ margin: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Dropdown lists={lists} />
      <AddActivityButton text="추가하기" />
      <AddActivityButton text="추가하기" inactive />
      <AddActivityButton text="추가하기" inactive outline />
      <AuthButton text="로그인" />
      <AuthButton text="로그인" inactive />
      <ReserveButton text="예약하기" />
      <ReserveButton text="예약하기" outline />
      <ReserveButton text="예약하기" inactive />
      <DatePickerInput />
    </div>
  );
}
export default Test;
