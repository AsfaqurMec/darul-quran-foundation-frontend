'use client';

import * as React from 'react';
import DonationWidget from '../../components/donation/DonationWidget';
import { useI18n } from '../../components/i18n/LanguageProvider';

function YouTube({ id, title }: { id: string; title: string }): React.ReactElement {
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

export default function RegularDonorTab(): React.ReactElement {
	const { t } = useI18n();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
			{/* Top notice bar spanning full width like screenshot */}
			<div className="lg:col-span-2 -mt-2">
				<div className="rounded-2xl bg-gray-100 border border-gray-200 text-gray-800 text-sm px-4 py-3">
					{t('regularDonorNotice')}
					&nbsp;<a href="mailto:autopay@darulquranfoundation.org" className="font-semibold text-emerald-700 underline">autopay@darulquranfoundation.org</a>&nbsp;- {t('regularDonorNoticeEmail')}
				</div>
			</div>
			{/* Left column: video + intro + benefits */}
			<div className="space-y-6">
				<div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
					<YouTube id="6iaWYbQ4Isg" title={t('regularDonorVideoTitle')} />

					{/* <div className="rounded-2xl bg-emerald-700 text-white p-5">
						<h3 className="text-lg font-extrabold leading-snug">
							অল্প দিন নিয়মিত অনুদান দিলে বড় কাজেও অংশীদার হওয়া যায়
						</h3>
						<p className="mt-2 text-sm text-emerald-50">
							মাসিক বা দৈনিক অটোপে সেটআপ করে আপনি আমাদের চলমান দাওয়াহ, শিক্ষাসেবা,
							দুর্যোগে ত্রাণসহ বিভিন্ন কল্যাণমূলক কাজে অংশ নিতে পারেন।
						</p>
						<div className="mt-4 grid grid-cols-2 gap-3">
							<div className="rounded-lg bg-white/10 border border-white/20 p-3">
								<div className="text-xs opacity-80">দাতা ধরন</div>
								<div className="font-semibold">দৈনিক / মাসিক</div>
							</div>
							<div className="rounded-lg bg-white/10 border border-white/20 p-3">
								<div className="text-xs opacity-80">সহায়তা</div>
								<div className="font-semibold">যেকোনো খাতে দান</div>
							</div>
						</div>
					</div> */}
				</div>

				{/* Text blocks */}
				<div className="space-y-6">
					{/* Hadith/quote card */}
					<div className="rounded-2xl bg-gray-100 border border-gray-200 p-5 text-center">
						<h3 className="text-base font-semibold text-gray-800 mb-2 text-center">
							{t('regularDonorHadith')}
						</h3>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						
						<p className="text-gray-700 leading-7 text-sm ">
                        {t('regularDonorDesc1')}
						</p>
                        <p className="text-gray-700 leading-7 text-sm mt-5">
                        {t('regularDonorDesc2')}
						</p>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						<h3 className="text-lg font-semibold mb-2">{t('regularDonorExpenseAreas')}</h3>
						<ul className="space-y-2 text-gray-700 text-sm leading-7">
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">✓</span>
								<span>{t('regularDonorExpense1')}</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">✓</span>
								<span>{t('regularDonorExpense2')}</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">✓</span>
								<span>{t('regularDonorExpense3')}</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">✓</span>
								<span>{t('regularDonorExpense4')}</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">✓</span>
								<span>{t('regularDonorExpense5')}</span>
							</li>
						</ul>
					</div>

					{/* Autopay info */}
					<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						<h3 className="text-lg font-semibold mb-3">{t('regularDonorAutopayTitle')}</h3>
						<p className="text-gray-700 leading-7 text-sm">
							{t('regularDonorAutopayDesc')}
						</p>
					</div>
				</div>
			</div>

			{/* Right column - Donation form */}
			<div className="sticky top-20">
				<DonationWidget />
			</div>
		</div>
	);
}


