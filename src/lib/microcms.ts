/**
 * microCMS APIクライアント
 *
 * 使い方:
 *   import { getNewsList, getNewsDetail } from '../lib/microcms';
 *   const news = await getNewsList({ limit: 5 });
 */
import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries } from 'microcms-js-sdk';
import type { News, Staff, RentalCategory, SaleItem, Recruit } from '../types/microcms';

/* ===========================
   Client
=========================== */
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error(
    '[microCMS] MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定です。' +
    '.env.local に設定してください。'
  );
}

export const client = createClient({ serviceDomain, apiKey });

/* ===========================
   News
=========================== */
export async function getNewsList(queries?: MicroCMSQueries) {
  return client.getList<News>({ endpoint: 'news', queries });
}

export async function getNewsDetail(contentId: string, queries?: MicroCMSQueries) {
  return client.getListDetail<News>({ endpoint: 'news', contentId, queries });
}

/* ===========================
   Staff
=========================== */
export async function getStaffList(queries?: MicroCMSQueries) {
  return client.getList<Staff>({ endpoint: 'staff', queries });
}

/* ===========================
   Rental Category
=========================== */
export async function getRentalCategoryList(queries?: MicroCMSQueries) {
  return client.getList<RentalCategory>({ endpoint: 'rental-category', queries });
}

export async function getRentalCategoryBySlug(slug: string) {
  const { contents } = await client.getList<RentalCategory>({
    endpoint: 'rental-category',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  if (contents.length === 0) throw new Error(`RentalCategory not found: ${slug}`);
  return contents[0];
}

/* ===========================
   Sale Item
=========================== */
export async function getSaleItemList(queries?: MicroCMSQueries) {
  return client.getList<SaleItem>({ endpoint: 'sale-item', queries });
}

export async function getSaleItemBySlug(slug: string) {
  // slugフィールドで検索、見つからなければidで検索
  const bySlug = await client.getList<SaleItem>({
    endpoint: 'sale-item',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  if (bySlug.contents.length > 0) return bySlug.contents[0];
  return client.getListDetail<SaleItem>({ endpoint: 'sale-item', contentId: slug });
}

/* ===========================
   Recruit
=========================== */
export async function getRecruit() {
  return client.getObject<Recruit>({ endpoint: 'recruit' });
}
