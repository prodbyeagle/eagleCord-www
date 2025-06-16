'use client';

import { CloudFeaturesSection } from '@/components/cloud/feature-section';
import { CloudGettingStarted } from '@/components/cloud/getting-started';
import { CloudHero } from '@/components/cloud/hero';
import { CloudResources } from '@/components/cloud/resources';

export default function CloudPage() {
	return (
		<main className='py-16'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-20'>
				<CloudHero />
				<CloudFeaturesSection />
				<CloudGettingStarted />
				<CloudResources />
			</div>
		</main>
	);
}
