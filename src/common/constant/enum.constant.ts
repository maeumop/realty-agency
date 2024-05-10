// 사용자 권한
export enum UserRole {
  ADMIN,
  OWNER,
  MANAGER,
  MEMBER,
}

// 물건 판매, 임대 형식
export enum RealtySaleRole {
  SELL, // 매매
  FULL_RENT, // 전세
  MONTHY_RENT, // 월세
}

export enum RealtyTypeRole {
  APART, // 아파트
  TICKET, // 분양권
  STORE, // 상점
  HOUSE, // 오피스텔, 다세대주택, 일반주택
}

export enum DirectionRole {
  E, // 동
  W, // 서
  S, // 남
  N, // 북
  SE, // 남동
  SW, // 남서
  NE, // 북동
  NW, // 북서
}

export enum SaleStatusRole {
  STANDBY,
  COMPLETE, // 계약, 판매 완료
  ONGOING, // 계약 진행 중
  BREAK, // 판매 중중단
}
