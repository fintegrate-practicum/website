import { Suspense, lazy } from 'react';

const PageLoader = (currentRoute: string) => lazy(() => import(currentRoute));

const LazyRouter = ({ currentRoute }: { currentRoute: string }) => {
	const PageComponent = PageLoader(currentRoute);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PageComponent />
		</Suspense>
	);
};

export default LazyRouter;
