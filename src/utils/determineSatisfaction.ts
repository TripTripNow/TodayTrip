const determineSatisfaction = (rating: number) => {
  if (rating >= 4.5) {
    return '매우 만족';
  } else if (rating >= 4.0) {
    return '만족';
  } else if (rating >= 3.0) {
    return '보통';
  } else if (rating >= 2.5) {
    return '불만족';
  } else {
    return '매우 불만족';
  }
};

export default determineSatisfaction;
