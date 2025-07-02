"use client";

import { Box, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./TabsNav.module.css";

export default function TabsNav() {
	const pathname = usePathname();
	const tabIndex = pathname === "/assets" ? 1 : 0;

	return (
		<Box className={styles.TabsNav}>
			<Tabs value={tabIndex}>
				<Tab label="Allocations" component={Link} href="/allocations" />
				<Tab label="Assets" component={Link} href="/assets" />
			</Tabs>
		</Box>
	);
}
