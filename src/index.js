// This loads javascript for this block on the frontend.
import { createRoot } from "@wordpress/element";
import { Grid } from "./components/Grid";

const blockDiv = document.querySelector("#codeable-skills-chat-gutenberg");
if (blockDiv) {
	createRoot(blockDiv).render(<Grid />);
}
