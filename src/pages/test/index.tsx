import Dropdown from '@/components/DropDown/Dropdown';
import DatePickerInput from '@/components/common/DatePicker/DatePicker';
import Button from '@/components/common/Button/Button';

const lists = ['문화 예술', '식음료', '스포츠', '투어', '관광'];

function Test() {
  return (
    <div style={{ margin: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <DatePickerInput />
      <Dropdown lists={lists} />
      <Button color="green" type="default">
        저장하기
      </Button>
      <Button color="green" type="default">
        체험 등록하기
      </Button>
      <Button color="green" type="auth">
        로그인 하기
      </Button>
      <Button color="green" type="auth">
        회원가입 하기
      </Button>
      <Button color="green" type="search">
        검색하기
      </Button>
      <Button color="green" type="activity">
        등록하기
      </Button>
      <Button color="green" type="activity">
        수정하기
      </Button>
      <Button color="green" type="reservation">
        후기 작성
      </Button>
      <Button color="white" type="reservation">
        예약 취소
      </Button>
      <Button color="green" type="modalSingle">
        예약하기
      </Button>
      <Button color="green" type="modalSingle">
        확인
      </Button>
      <Button color="green" type="modalSingle">
        작성하기
      </Button>
      <Button color="green" type="modalDouble">
        확정하기
      </Button>
      <Button color="white" type="modalDouble">
        거절하기
      </Button>
      <Button color="green" type="category">
        문화·예술
      </Button>
      <Button color="white" type="category">
        문화·예술
      </Button>
      <Button color="green" type="time">
        14:00~15:00
      </Button>
      <Button color="white" type="time">
        14:00~15:00
      </Button>
    </div>
  );
}
export default Test;
