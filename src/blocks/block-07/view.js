// This loads javascript for this block on the frontend.
import { createRoot } from "@wordpress/element";
import { Grid } from "./components/Grid";

const blockDiv = document.querySelector("div.wp-block-schmitzoide-block-07");
if (blockDiv) {
	createRoot(blockDiv).render(<Grid />);
}
