/**
 * microCMS APIクライアント
 *
 * 使い方:
 *   import { getNewsList, getNewsDetail } from '../lib/microcms';
 *   const news = await getNewsList({ limit: 5 });
 */
import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries } from 'microcms-js-sdk';
import type { News, Faq, Staff } from '../types/microcms';

/* ===========================
   Client
=========================== */
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  console.warn(
    '[microCMS] MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定です。' +
    'ダミーデータを使用します。'
  );
}

export const client = serviceDomain && apiKey
  ? createClient({ serviceDomain, apiKey })
  : null;

/* ===========================
   News
=========================== */
export async function getNewsList(queries?: MicroCMSQueries) {
  if (!client) return { contents: getDummyNews(), totalCount: getDummyNews().length, offset: 0, limit: 10 };
  return client.getList<News>({ endpoint: 'news', queries });
}

export async function getNewsDetail(contentId: string, queries?: MicroCMSQueries) {
  if (!client) {
    const dummy = getDummyNews().find((n) => n.id === contentId);
    if (!dummy) throw new Error(`News not found: ${contentId}`);
    return dummy;
  }
  return client.getListDetail<News>({ endpoint: 'news', contentId, queries });
}

/* ===========================
   FAQ
=========================== */
export async function getFaqList(queries?: MicroCMSQueries) {
  if (!client) return { contents: [], totalCount: 0, offset: 0, limit: 10 };
  return client.getList<Faq>({ endpoint: 'faq', queries });
}

/* ===========================
   Staff
=========================== */
export async function getStaffList(queries?: MicroCMSQueries) {
  if (!client) return { contents: getDummyStaff(), totalCount: getDummyStaff().length, offset: 0, limit: 10 };
  return client.getList<Staff>({ endpoint: 'staff', queries });
}

/* ===========================
   ダミーデータ（API未設定時のフォールバック）
=========================== */
function getDummyStaff(): (Staff & { id: string })[] {
  return [
    {
      id: 'staff-1',
      name: '後藤 純',
      role: '代表取締役 / 福祉用具専門相談員',
      message: '「笑顔をつなげる、ありがとうをつなげる」をモットーに、お客様一人ひとりに寄り添ったサービスを提供してまいります。',
      qualifications: '福祉用具専門相談員 / 福祉住環境コーディネーター2級',
      order: 1,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      publishedAt: '2024-01-01T00:00:00.000Z',
      revisedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'staff-2',
      name: 'スタッフA',
      role: '福祉用具専門相談員',
      message: 'ご利用者様の生活がより豊かになるよう、最適な福祉用具をご提案いたします。お気軽にご相談ください。',
      qualifications: '福祉用具専門相談員 / 介護福祉士',
      order: 2,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      publishedAt: '2024-01-01T00:00:00.000Z',
      revisedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'staff-3',
      name: 'スタッフB',
      role: '福祉用具専門相談員',
      message: '住宅改修から福祉用具まで、住みやすい暮らしのお手伝いをさせていただきます。',
      qualifications: '福祉用具専門相談員 / 福祉住環境コーディネーター2級',
      order: 3,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      publishedAt: '2024-01-01T00:00:00.000Z',
      revisedAt: '2024-01-01T00:00:00.000Z',
    },
  ];
}

function getDummyNews(): (News & { id: string })[] {
  return [
    {
      id: 'dummy-1',
      title: '2025年度 介護保険制度改正に伴うレンタル価格改定のご案内',
      category: 'お知らせ',
      content: '<p>2025年4月より、介護保険制度改正に伴い一部レンタル品目の価格が改定されます。</p>',
      createdAt: '2025-02-01T00:00:00.000Z',
      updatedAt: '2025-02-01T00:00:00.000Z',
      publishedAt: '2025-02-01T00:00:00.000Z',
      revisedAt: '2025-02-01T00:00:00.000Z',
    },
    {
      id: 'dummy-2',
      title: '福祉用具展示会・無料相談会を開催します（2月22日）',
      category: 'イベント',
      content: '<p>福祉用具の展示会を開催いたします。ぜひお気軽にお越しください。</p>',
      createdAt: '2025-01-15T00:00:00.000Z',
      updatedAt: '2025-01-15T00:00:00.000Z',
      publishedAt: '2025-01-15T00:00:00.000Z',
      revisedAt: '2025-01-15T00:00:00.000Z',
    },
    {
      id: 'dummy-3',
      title: '新年明けましておめでとうございます。本年もよろしくお願いいたします。',
      category: 'お知らせ',
      content: '<p>2025年も皆さまのお役に立てるよう努めてまいります。</p>',
      createdAt: '2025-01-06T00:00:00.000Z',
      updatedAt: '2025-01-06T00:00:00.000Z',
      publishedAt: '2025-01-06T00:00:00.000Z',
      revisedAt: '2025-01-06T00:00:00.000Z',
    },
    {
      id: 'dummy-4',
      title: '福祉用具専門相談員 スタッフ募集中（正社員・パート）',
      category: '採用',
      content: '<p>一緒に働く仲間を募集しています。詳しくは採用情報ページをご覧ください。</p>',
      createdAt: '2024-12-20T00:00:00.000Z',
      updatedAt: '2024-12-20T00:00:00.000Z',
      publishedAt: '2024-12-20T00:00:00.000Z',
      revisedAt: '2024-12-20T00:00:00.000Z',
    },
    {
      id: 'dummy-5',
      title: 'オンラインサポートシステム（OSS）をリニューアルしました',
      category: 'お知らせ',
      content: '<p>より使いやすくなったオンラインサポートをぜひご活用ください。</p>',
      createdAt: '2024-11-01T00:00:00.000Z',
      updatedAt: '2024-11-01T00:00:00.000Z',
      publishedAt: '2024-11-01T00:00:00.000Z',
      revisedAt: '2024-11-01T00:00:00.000Z',
    },
  ];
}
