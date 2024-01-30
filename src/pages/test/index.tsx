import Dropdown from '@/components/common/DropDown/Dropdown';
import { useState } from 'react';

const ACTIVITIES = [
  {
    id: 1,
    userId: 1,
    title: '1',
    description: '2',
    category: '1',
    price: 1,
    address: '1',
    bannerImageUrl: '1',
    rating: 1,
    reviewCount: 1,
    createdAt: 'Date',
    updatedAt: 'Date',
  },
  {
    id: 2,
    userId: 2,
    title: '2',
    description: '2',
    category: '2',
    price: 3,
    address: '1',
    bannerImageUrl: '1',
    rating: 3,
    reviewCount: 3,
    createdAt: 'Date',
    updatedAt: 'Date',
  },
];

function Test() {
  const [dropdownItem, setDropdownItem] = useState<string | number>('');
  console.log(dropdownItem);
  return (
    <div style={{ paddingBottom: '300px' }}>
      <Dropdown activities={ACTIVITIES} setDropdownItem={setDropdownItem} />
      <div style={{ marginTop: '400px' }}></div>
      <Dropdown setDropdownItem={setDropdownItem} />
    </div>
  );
}
export default Test;
