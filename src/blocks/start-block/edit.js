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
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ColorPalette } from "@wordpress/components";

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
	const { content, borderColor } = attributes;

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Products">
					<ColorPalette
						colors={[
							{ name: "red", color: "#f00" },
							{ name: "black", color: "#000" },
							{ name: "blue", color: "#00f" },
						]}
						value={borderColor}
						onChange={(borderColor) => setAttributes({ borderColor })}
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				style={{
					borderColor: borderColor,
					borderWidth: "1px",
					borderStyle: "solid",
				}}
				tagName="p"
				value={content}
				onChange={(content) => setAttributes({ content })}
				placeholder={__(
					"Write your content...",
					"codeable-skills-chat-gutenberg",
				)}
			/>
		</div>
	);
}
