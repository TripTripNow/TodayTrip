import { getMyActivities } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function useMActivities() {
  const { isVisible, targetRef } = useInfiniteScroll();

  const { data: myActivityItems, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.myActivities],
    queryFn: ({ pageParam }) => getMyActivities({ cursorId: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentCursorId = lastPage.cursorId;
      return currentCursorId;
    },
  });

  const filteredMyActivities = myActivityItems?.pages.flatMap((page) => page.activities);
  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  return { filteredMyActivities, targetRef };
}

export default useMActivities;
