import Dropdown from '@/components/DropDown/Dropdown';
import AddActivityButton from '@/components/common/Button/AddActivityButton';
import AuthButton from '@/components/common/Button/AuthButton';
import ReserveButton from '@/components/common/Button/ReserveButton';
import DatePickerInput from '@/components/common/DatePicker/DatePicker';
import ModalButton from '@/components/common/Button/ModalButton';
import CategoryButton from '@/components/common/Button/CategoryButton';

const lists = ['문화 예술', '식음료', '스포츠', '투어', '관광'];

function Test() {
  return (
    <div style={{ margin: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Dropdown lists={lists} />
      <AddActivityButton text="등록하기" />
      <AddActivityButton text="등록하기" inactive />
      <AuthButton text="로그인" />
      <AuthButton text="로그인" inactive />
      <ReserveButton text="체험 등록" />
      <ReserveButton text="예약취소" outline />
      <ReserveButton text="예약불가" inactive />
      <ModalButton text="확정하기" type="confirm" />
      <ModalButton text="취소하기" type="confirm" outline />
      <ModalButton text="14:00~15:00" type="time" />
      <ModalButton text="14:00~15:00" type="time" outline />
      <CategoryButton text="문화예술" />
      <CategoryButton text="문화예술" outline />
      <DatePickerInput />
    </div>
  );
}
export default Test;
