'use client';

import * as React from 'react';
import MemberApplication from '@/components/get-involved/MemberApplication';
import { useI18n } from '@/components/i18n/LanguageProvider';

function YouTube({ id, title }: { id: string; title: string }): JSX.Element {
	return (
		<div className="rounded-2xl overflow-hidden bg-gray-200">
			<div className="relative aspect-video w-full">
				<iframe
					className="absolute inset-0 h-full w-full"
					src={`https://www.youtube.com/embed/${id}`}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				/>
			</div>
		</div>
	);
}

export default function LifetimeMemberTab(): JSX.Element {
	const { t } = useI18n();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
			{/* Left column: content blocks */}
			<div className="space-y-6">
				<h3 className="text-2xl font-semibold">{t('lifetimeMemberRulesTitle')}</h3>
				<p className="text-sm text-gray-700 leading-7">
					{t('lifetimeMemberDesc1')}
				</p>

				<YouTube id="9lVqYxgHq1M" title={t('lifetimeMemberVideoTitle')} />

				<p className="text-sm text-gray-700 leading-7">
					{t('lifetimeMemberDesc2')}
				</p>

				<p className="text-sm text-gray-700 leading-7">
					{t('lifetimeMemberDesc3')}
				</p>

				<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
					<h4 className="text-lg font-semibold mb-2">{t('lifetimeMemberMosqueTitle')}</h4>
					<p className="text-gray-700 leading-7 text-sm">
                    {t('lifetimeMemberMosqueDesc1')}
					</p>
					<p className="text-gray-700 leading-7 text-sm mt-3">
                    {t('lifetimeMemberMosqueDesc2')}
					</p>
				</div>

				{/* Green bullet card with CTA */}
				<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
					<h4 className="text-lg font-semibold mb-2">{t('lifetimeMemberFeaturesTitle')}</h4>
					<ul className="space-y-2 text-gray-800 text-sm leading-7">
						<li className="flex items-start gap-2">
							<span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">✓</span>
							{t('lifetimeMemberFeature1')}
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">✓</span>
							{t('lifetimeMemberFeature2')}
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">✓</span>
							{t('lifetimeMemberFeature3')}
						</li>
					</ul>
					<div className="pt-4">
						<button type="button" className="rounded-lg border px-4 py-2 bg-white">{t('lifetimeMemberMoreInfo')}</button>
					</div>
				</div>
			</div>

			{/* Right column: stacked panels (flex column) */}
			<div className="flex flex-col gap-4">
				{/* Intro policy + two cards */}
				<div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 shadow-sm">
					<p className="text-gray-800 leading-7 text-sm">
						{t('lifetimeMemberPolicyDesc')}
					</p>

					<div className="mt-5 space-y-5">
						<div className="rounded-2xl bg-white border border-gray-200 p-5">
							<h5 className="text-lg font-semibold mb-2">{t('lifetimeMemberTypeTitle')}</h5>
							<p className="text-sm text-gray-700 leading-7">
								{t('lifetimeMemberTypeDesc')}
							</p>
						</div>
						<div className="rounded-2xl bg-white border border-gray-200 p-5">
							<h5 className="text-lg font-semibold mb-2">{t('donorMemberTypeTitle')}</h5>
							<p className="text-sm text-gray-700 leading-7">
								{t('donorMemberTypeDesc')}
							</p>
						</div>
					</div>
				</div>

				{/* Application card with green header and embedded form */}
				<div className="rounded-2xl overflow-hidden border border-emerald-200 bg-white shadow-sm">
					<div className="bg-emerald-700 text-white px-5 py-4">
						<h3 className="text-lg font-extrabold">{t('memberApplicationTitle')}</h3>
						<p className="text-emerald-50 text-sm">{t('memberApplicationSubtitle')}</p>
					</div>
					<div className="p-5">
						<MemberApplication embedded />
					</div>
				</div>
			</div>
		</div>
	);
}


