/**
 * Registers a new plugin to the block editor.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-document-setting-panel/
 */
import { registerPlugin } from "@wordpress/plugins";

/**
 * WordPress dependencies
 */
import { PluginDocumentSettingPanel } from "@wordpress/editor";
import { TextControl } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import metadata from "./block.json";

const PluginDocumentSettingPanelDemo = () => {
	// Get the meta value from the post.
	const metaValue = useSelect(
		(select) =>
			select("core/editor").getEditedPostAttribute("meta")[
				"codeable_skills_chat_gutenberg"
			] || "",
	);

	// Get the editPost function to update the meta value
	const { editPost } = useDispatch("core/editor");

	return (
		<PluginDocumentSettingPanel
			name="custom-panel"
			title={metadata.title}
			className="custom-panel"
		>
			<p>{metadata.description}</p>
			<TextControl
				label="Meta Field"
				help="Enter a value for the meta field."
				value={metaValue}
				onChange={(value) =>
					editPost({
						meta: {
							codeable_skills_chat_gutenberg: value,
						},
					})
				}
			/>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin("plugin-document-setting-panel-demo", {
	render: PluginDocumentSettingPanelDemo,
	icon: "palmtree",
});
