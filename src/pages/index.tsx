import Main from '@/components/Home/Home';
import { localStorageSetItem } from '@/utils/localStorage';

function Home() {
  localStorageSetItem(
    'recentText',
    ' 함께 배우면 즐거운, 연인과 사랑의 징검, VR 게임 마스터, 피오르 체험, 해안가 마을에서 1주일, 부모님과 함께, 열기구 페스티벌, 베트남 자전거 여행',
  );
  return (
    <main>
      <Main />
    </main>
  );
}

export default Home;
