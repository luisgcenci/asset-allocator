import type { Metadata } from "next";
import ReduxProvider from "store/redux-provider";
import TabsNav from "./TabsNav";

export const metadata: Metadata = {
	title: "React App",
	description: "Web site created with Next.js.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ReduxProvider>
					<TabsNav />
					{children}
				</ReduxProvider>
			</body>
		</html>
	);
}
