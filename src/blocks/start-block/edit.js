/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	BlockControls,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
	headingLevel1,
	headingLevel2,
	headingLevel3,
	headingLevel4,
	headingLevel5,
	headingLevel6,
} from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { heading, content } = attributes;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<BlockControls
				controls={[
					{
						icon: headingLevel1,
						title: __("H1"),
						onClick: () => setAttributes({ heading: "h1" }),
						isActive: heading === "h1",
					},
					{
						icon: headingLevel2,
						title: __("H2"),
						onClick: () => setAttributes({ heading: "h2" }),
						isActive: heading === "h2",
					},
					{
						icon: headingLevel3,
						title: __("H3"),
						onClick: () => setAttributes({ heading: "h3" }),
						isActive: heading === "h3",
					},
					{
						icon: headingLevel4,
						title: __("H4"),
						onClick: () => setAttributes({ heading: "h4" }),
						isActive: heading === "h4",
					},
					{
						icon: headingLevel5,
						title: __("H5"),
						onClick: () => setAttributes({ heading: "h5" }),
						isActive: heading === "h5",
					},
					{
						icon: headingLevel6,
						title: __("H6"),
						onClick: () => setAttributes({ heading: "h6" }),
						isActive: heading === "h6",
					},
				]}
			/>

			<RichText
				tagName={heading}
				value={content}
				onChange={(content) => setAttributes({ content })}
				placeholder={__("Add your heading")}
				allowedFormats={["core/bold"]}
			/>
			<InnerBlocks />
		</div>
	);
}
