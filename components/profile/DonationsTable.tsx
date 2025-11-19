import React from 'react';

type Donation = {
	_id: string;
	amount: number;
	method?: string;
	reference?: string;
	status?: string;
	createdAt: string;
	[key: string]: any;
};

export default function DonationsTable({
	donations,
	loading,
}: {
	donations: Donation[];
	loading: boolean;
}): JSX.Element {
	if (loading) {
		return <p>Loading donations...</p>;
	}
	if (!donations || donations.length === 0) {
		return <div className="rounded-xl border border-gray-200 bg-white p-6">No donation records found.</div>;
	}
	return (
		<div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="bg-gray-50 text-gray-600">
						<tr>
							<th className="px-4 py-3 text-left font-medium">Date</th>
							<th className="px-4 py-3 text-left font-medium">Amount</th>
							<th className="px-4 py-3 text-left font-medium">Method</th>
							<th className="px-4 py-3 text-left font-medium">Reference</th>
							<th className="px-4 py-3 text-left font-medium">Status</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 bg-white">
						{donations.map((d) => (
							<tr key={d._id}>
								<td className="px-4 py-3">{new Date(d.createdAt).toLocaleString()}</td>
								<td className="px-4 py-3">{d.amount}</td>
								<td className="px-4 py-3">{d.method || '-'}</td>
								<td className="px-4 py-3">{d.reference || '-'}</td>
								<td className="px-4 py-3">{d.status || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}


