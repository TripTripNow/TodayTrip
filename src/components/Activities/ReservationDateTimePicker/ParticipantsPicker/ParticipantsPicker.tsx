import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './ParticipantsPicker.module.css';
import MinusIcon from '#/icons/icon-minus.svg';
import PlusIcon from '#/icons/icon-smallPlus.svg';
import clsx from 'clsx';

interface ParticipantsPickerProp {
  participantsValue: number;
  setParticipantsValue: Dispatch<SetStateAction<number>>;
  isInModal?: boolean;
}
function ParticipantsPicker({ participantsValue, setParticipantsValue, isInModal }: ParticipantsPickerProp) {
  const handleParticipantsValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParticipantsValue(Number(e.target.value));
  };

  return (
    <div className={clsx(isInModal ? styles.inModal : styles.participants)}>
      <h2 className={styles.label}>참여 인원 수</h2>
      <div id="participants" className={styles.stepper}>
        <button
          aria-label="인원 감소 버튼"
          className={styles.minusButton}
          disabled={participantsValue <= 1}
          onClick={() => setParticipantsValue((prev) => prev - 1)}
        >
          <MinusIcon fill="#4B4B4B" alt="참여 인원 수 줄이기 아이콘" />
        </button>
        <input
          aria-labelledby="participants"
          className={styles.participantsInput}
          value={participantsValue}
          onChange={handleParticipantsValueChange}
          min={1}
          // 숫자가 아닌 값을 입력할 경우 1로 세팅되게 만듦
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            if (isNaN(+e.target.value)) {
              e.target.value = String(1);
            }
          }}
        />
        <button onClick={() => setParticipantsValue((prev) => prev + 1)}>
          <PlusIcon aria-label="인원 추가 버튼" alt="참여 인원 수 늘리기 아이콘" />
        </button>
      </div>
    </div>
  );
}

export default ParticipantsPicker;
