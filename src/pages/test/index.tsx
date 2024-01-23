import AuthButton from '@/components/common/Button/AuthButton';
import Button from '@/components/common/Button/Button';
import ActivityButton from '@/components/common/Button/ReserveButton';
import AddActivityButton from '@/components/common/Button/AddActivityButton';

function Test() {
  return (
    <div style={{ margin: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <AuthButton text="로그인" />
      <AuthButton inactive text="로그인" />
      <Button text="저장하기" />
      <Button outline inactive text="저장하기" />
      <Button text="체험 등록하기" />
      <ActivityButton text="후기 작성" />
      <ActivityButton text="예약 취소" outline />
      <AddActivityButton text="등록하기" />
      <AddActivityButton text="등록하기" inactive />
    </div>
  );
}
export default Test;
