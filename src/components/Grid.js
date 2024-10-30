/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { Panel, PanelBody, PanelRow, TabPanel } from "@wordpress/components";

/**
 * Import the styles for the block.
 */
import "./Grid.scss";

/**
 *
 * Grid Component
 * This component is used to display a list of posts.
 *
 * @param {Object} props Component props.
 * @returns {Element} Element to render.
 */
export const Grid = (props) => {
	const [selectedTab, setSelectedTab] = React.useState("tab1");

	return (
		<>
			<TabPanel
				className="my-tab-panel"
				activeClass="active-tab"
				onSelect={(tab) => setSelectedTab(tab)}
				tabs={[
					{
						name: "tab1",
						title: "Tab 1",
						className: "tab-one",
					},
					{
						name: "tab2",
						title: "Tab 2",
						className: "tab-two",
					},
				]}
			>
				{(tab) => <p>{tab.title}</p>}
			</TabPanel>

			{selectedTab === "tab1" && (
				<Panel header="My panel">
					<React.Fragment key=".0">
						<PanelBody title="First section">
							<PanelRow>
								<div
									style={{
										background: "#ddd",
										height: 100,
										width: "100%",
									}}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody title="Second section">
							<PanelRow>
								<div
									style={{
										background: "#ddd",
										height: 100,
										width: "100%",
									}}
								/>
							</PanelRow>
						</PanelBody>
					</React.Fragment>
				</Panel>
			)}
			{selectedTab === "tab2" && (
				<Panel header="My panel">
					<React.Fragment key=".0">
						<PanelBody title="First section">
							<PanelRow>
								<div
									style={{
										background: "#ddd",
										height: 100,
										width: "100%",
									}}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody title="Second section">
							<PanelRow>
								<div
									style={{
										background: "#ddd",
										height: 100,
										width: "100%",
									}}
								/>
							</PanelRow>
						</PanelBody>
					</React.Fragment>
				</Panel>
			)}
		</>
	);
};
