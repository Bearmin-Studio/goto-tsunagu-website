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
  thumbnail?: MicroCMSImage;
  excerpt?: string;
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
   よくある質問 (faq)
   API型: リスト形式
=========================== */
export interface Faq extends MicroCMSContentId, MicroCMSDate {
  question: string;
  answer: string;
  category?: string;
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
  qualifications?: string;
  order: number;
}

