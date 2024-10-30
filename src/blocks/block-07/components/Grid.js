/**
 * WordPress Dependencies
 */
import { useSelect } from "@wordpress/data";
import { useState, useCallback, useEffect } from "@wordpress/element";
import { store as coreStore } from "@wordpress/core-data";

/**
 *
 * Grid Component
 * This component is used to display a list of posts.
 *
 * @param {Object} props Component props.
 * @returns {Element} Element to render.
 */
export const Grid = (props) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

	// Debounce searchTerm by 300 ms
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 300);

		// Clear the timeout if the user starts typing again before 300ms
		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	// Update search term without re-rendering the component
	const handleSearchChange = useCallback((e) => {
		setSearchTerm(e.target.value);
	}, []);

	return (
		<>
			<input
				type="search"
				placeholder="Search posts..."
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			<List searchTerm={debouncedSearchTerm} />
		</>
	);
};

function List({ searchTerm }) {
	const posts = useSelect(
		(select) =>
			select(coreStore).getEntityRecords("postType", "post", {
				per_page: 5,
				search: searchTerm,
			}),
		[searchTerm],
	);

	if (!posts) {
		return <p>Loading...</p>;
	}

	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>
					<h2>
						<a href={post.link}>{post.title.rendered}</a>
					</h2>
					<p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
				</li>
			))}
		</ul>
	);
}
