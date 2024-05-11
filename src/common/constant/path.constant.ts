import { join } from 'path';

const ROOT_PATH = process.cwd();
export const UPLOAD_PATH = join(ROOT_PATH, 'upload');
export const PROFILE_UPLOAD_PATH = join(UPLOAD_PATH, 'profile');
export const REALTY_UPLOAD_PATH = join(ROOT_PATH, UPLOAD_PATH, 'realty');

// 업로드 파일 임시 저장 경로
export const TEMP_PATH = join(UPLOAD_PATH, 'temp');

export const UPLOAD_URL_PATH = join('upload');
export const PROFILE_URL_PATH = join(UPLOAD_URL_PATH, 'profile');
export const REALTY_URL_PATH = join(UPLOAD_URL_PATH, 'realty');
