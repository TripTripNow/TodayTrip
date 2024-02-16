const useBodyScrollLock = () => {
  const lockScroll = () => (document.body.style.overflow = 'hidden');
  const openScroll = () => (document.body.style.overflow = 'unset');

  return { lockScroll, openScroll };
};

export default useBodyScrollLock;
