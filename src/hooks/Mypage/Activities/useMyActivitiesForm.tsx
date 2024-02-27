import Dropdown from '@/components/common/DropDown/Dropdown';
import { priceFormat } from '@/utils/priceFormat';
import { useState, useEffect, ChangeEvent } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

function useMyActivitiesForm(methods: UseFormReturn<FieldValues>) {
  const { handleSubmit, control, setValue, register, getValues } = methods;
  const [category, setCategory] = useState(getValues('category'));
  const { isValid } = methods.formState;
  const [isActive, setIsActive] = useState(false);

  const watchAll = Object.values(methods.watch());

  useEffect(() => {
    if (watchAll.slice(0, 7).every((el: any) => el.length > 0 && el !== '0')) {
      setIsActive(true);
      return;
    }
    setIsActive(false);
  }, [watchAll]);

  //훅폼 이용 숫자(양수)만 입력되게 + number형으로
  control.register('price', {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyNumber = value.replace(/[^0-9]/g, '');

      setValue('price', priceFormat(+onlyNumber));
    },
  });

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    //이벤트가 발생한 요소가 textarea, dropDown외에서는 enter 막음
    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement) && !(e.target instanceof Dropdown)) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    if (category) setValue('category', category.title ? category.title : category);
  }, [category]);

  return {
    handleSubmit,
    handleFormKeyDown,
    control,
    setCategory,
    category,
    register,
    setValue,
    getValues,
    isActive,
    isValid,
  };
}

export default useMyActivitiesForm;
