import React from 'react';
import type { User } from '@/services/Users';

export default function UserInfo({ user }: { user: User }): JSX.Element {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<div className="rounded-xl border border-gray-200 bg-white p-6">
				<h2 className="text-lg font-semibold mb-4">Basic Information</h2>
				<div className="space-y-2 text-sm">
					<p><span className="font-medium text-gray-600">Full Name:</span> {user.fullName}</p>
					<p><span className="font-medium text-gray-600">Email:</span> {user.email}</p>
					<p><span className="font-medium text-gray-600">Phone:</span> {user.phone}</p>
					{user.role && <p><span className="font-medium text-gray-600">Role:</span> {user.role}</p>}
				</div>
			</div>
			<div className="rounded-xl border border-gray-200 bg-white p-6">
				<h2 className="text-lg font-semibold mb-4">Additional</h2>
				<div className="space-y-2 text-sm">
					{user.companyName && <p><span className="font-medium text-gray-600">Company:</span> {user.companyName}</p>}
					{user.fullAddress && <p><span className="font-medium text-gray-600">Address:</span> {user.fullAddress}</p>}
					{typeof user.totalDonate !== 'undefined' && (
						<p><span className="font-medium text-gray-600">Total Donated:</span> {user.totalDonate}</p>
					)}
					<p><span className="font-medium text-gray-600">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
				</div>
			</div>
		</div>
	);
}


