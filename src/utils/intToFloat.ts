/**
 * @description 정수를 소수점으로 변환해주는 함수 (ex. inToFloat(10, 2) = 10.00)
 * @param num 소수점을 반영할 숫자
 * @param decPlaces 소수점 몇자리인지?
 * @returns 소수점이 반영된 숫자
 */

export const intToFloat = (num: number, decPlaces: number) => num.toFixed(decPlaces);
