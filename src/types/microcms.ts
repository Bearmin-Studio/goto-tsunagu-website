/**
 * microCMS API スキーマ型定義
 */
import type { MicroCMSImage, MicroCMSDate, MicroCMSContentId } from 'microcms-js-sdk';

/* ===========================
   お知らせ (news)
   API型: リスト形式
=========================== */
export interface News extends MicroCMSContentId, MicroCMSDate {
  title: string;
  category: NewsCategory;
  content: string;
}

export type NewsCategory = 'お知らせ' | 'イベント' | '採用' | 'メディア';

/* ===========================
   サービス (services)
   API型: リスト形式
   ※ 将来的にCMS管理する場合用
=========================== */
export interface Service extends MicroCMSContentId, MicroCMSDate {
  title: string;
  description: string;
  thumbnail?: MicroCMSImage;
  slug: string;
  order: number;
}

/* ===========================
   スタッフ (staff)
   API型: リスト形式
=========================== */
export interface Staff extends MicroCMSContentId, MicroCMSDate {
  name: string;
  role: string;
  photo?: MicroCMSImage;
  message?: string;
  order: number;
}

/* ===========================
   レンタル用具カテゴリ (rental-category)
   API型: リスト形式
=========================== */
export interface RentalCategory extends MicroCMSContentId, MicroCMSDate {
  name: string;
  desc: string;
  content?: string;
  image?: MicroCMSImage;
  slug: string;
  order: number;
}

/* ===========================
   販売品目 (sale-item)
   API型: リスト形式
=========================== */
export interface SaleItem extends MicroCMSContentId, MicroCMSDate {
  name: string;
  desc: string;
  content?: string;
  image?: MicroCMSImage;
  slug: string;
  order: number;
}

/* ===========================
   募集要項 (recruit)
   API型: オブジェクト形式
=========================== */
export interface Recruit extends MicroCMSDate {
  position: string;
  employmentType: string;
  location: string;
  hours: string;
  holidays: string;
  salary: string;
  requirements: string;
  benefits: string;
}

