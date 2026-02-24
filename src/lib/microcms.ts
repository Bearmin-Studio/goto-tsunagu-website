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
      role: '代表取締役',
      photo: { url: 'https://goto-t.co.jp/wp-content/uploads/2020/11/DSC1763.png', width: 400, height: 500 },
      message: '株式会社後藤は2020年に創業いたしました。高齢化社会が進む中、介護を必要とされるお客様の生活を支えるためには周りのご家族様、福祉・医療関係者様との連携が不可欠と強く感じております。お客様の想い、ご家族様の想い、施設関係者様の想いをつなげる人間味溢れたサービスを心掛け、おひとりおひとりの人生に寄り添い、最善のサポートをいたします。',
      qualifications: undefined,
      order: 1,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      publishedAt: '2024-01-01T00:00:00.000Z',
      revisedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'staff-2',
      name: '吉田',
      role: '福祉用具専門相談員',
      photo: { url: 'https://goto-t.co.jp/wp-content/uploads/2020/11/staff2.png', width: 400, height: 500 },
      message: '利用者様やご家族が、元気に笑顔になっていただけるように、コミュニケーションを大切にしています。私たちの仕事は単なる商品提供ではありません。利用者様、介助者様のお話にしっかり耳を傾け、ご要望をお聞きしながら最適な商品選びをサポートいたします。',
      qualifications: '福祉用具専門相談員',
      order: 2,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      publishedAt: '2024-01-01T00:00:00.000Z',
      revisedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'staff-3',
      name: '後藤',
      role: '事務員',
      photo: { url: 'https://goto-t.co.jp/wp-content/uploads/2020/11/staff1.png', width: 400, height: 500 },
      message: 'お客様に安心していただけるようなご対応を心掛けております。また、営業担当者がスムーズに動けるように、縁の下の力持ちとなるよう務めております。弊社窓口を担当しておりますので、お困り事やご相談がございましたらお気軽にお問合せください。',
      qualifications: undefined,
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
