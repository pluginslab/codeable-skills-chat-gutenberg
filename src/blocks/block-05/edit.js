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
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Fetch posts data from the WordPress REST API.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-data/
 */
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/apiFetch";

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
export default function Edit() {
	const blockProps = useBlockProps();

	// Fetch 5 posts
	const posts = useSelect((select) => {
		const query = { per_page: 5 };
		return select(coreStore).getEntityRecords("postType", "post", query);
	}, []);

	//const [posts, setPosts] = useState([]);
	// useEffect(() => {
	// 	apiFetch({
	// 		path: "/schmitzoide/v1/random-posts",
	// 	}).then((posts) => {
	// 		setPosts(posts);
	// 	});
	// }, []);

	return (
		<div {...blockProps}>
			{posts ? (
				<ul>
					{posts.map((post) => (
						<li key={post.id}>
							<a href={post.link} target="_blank" rel="noopener noreferrer">
								{post.title.rendered}
							</a>
						</li>
					))}
				</ul>
			) : (
				<p>{__("Loading posts...", "text-domain")}</p>
			)}
		</div>
	);
}
