// 사용자 권한
export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
}

// 물건 판매, 임대 형식
export enum RealtySaleRole {
  SELL = 'SELL', // 매매
  FULL_RENT = 'FULL_RENT', // 전세
  MONTHY_RENT = 'MONTHY_RENT', // 월세
}

export enum RealtyTypeRole {
  APART = 'APART', // 아파트
  TICKET = 'TICKET', // 분양권
  STORE = 'STORE', // 상점
  HOUSE = 'HOUSE', // 오피스텔, 다세대주택, 일반주택
}

export enum DirectionRole {
  E = 'E', // 동
  W = 'W', // 서
  S = 'S', // 남
  N = 'N', // 북
  SE = 'SE', // 남동
  SW = 'SW', // 남서
  NE = 'NE', // 북동
  NW = 'NW', // 북서
}

export enum SaleStatusRole {
  STANDBY = 'STANDBY',
  COMPLETE = 'COMPLETE', // 계약, 판매 완료
  ONGOING = 'ONGOING', // 계약 진행 중
  BREAK = 'BREAK', // 판매 중중단
}

export enum UploadTypeRole {
  REALTY = 'REALTY',
  PROFILE = 'PROFILE',
}
