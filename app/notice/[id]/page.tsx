import React from 'react';
import Container from '../../../components/layout/Container';
import NoticeDetail from '../../../components/notice/NoticeDetail';
import { getNoticeById } from '../../../services/notices';

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
  const { id } = await params;

  // Fetch from backend
  const { data } = await getNoticeById(id);

  const notice = data
    ? {
        id: data.id ?? id,
        title: data.title,
        date: data.date,
        tag: data.category,
        excerpt: data.subTitle,
        category: data.category,
        fullContent: data.fullContent,
        href: `/notice/${data.id ?? id}`,
      }
    : null;

  if (!notice) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Notice Not Found</h1>
            <p className="text-gray-600 mb-6">The notice you're looking for doesn't exist.</p>
            <a href="/notice" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              ← Back to Notice Board
            </a>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <NoticeDetail notice={notice} />
    </div>
  );
}

