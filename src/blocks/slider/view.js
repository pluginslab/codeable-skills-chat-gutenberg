/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

(function () {
	const sliderIndices = {};
	const isButtonScroll = {};

	// Function to scroll to a specific slide based on index
	window.scrollSlider = function (direction, sliderId) {
		const slider = document.querySelector(
			`.wp-block-schmitzoide-slider[data-slider-id="${sliderId}"]`,
		);
		const slides = slider.querySelectorAll(".wp-block-schmitzoide-slider-item");
		const totalSlides = slides.length;

		// Initialize the index and isButtonScroll for each slider if they haven't been set yet
		if (!(sliderId in sliderIndices)) {
			sliderIndices[sliderId] = 0;
			isButtonScroll[sliderId] = false;
		}

		// Update index based on direction and ensure it stays within bounds
		if (direction === "next" && sliderIndices[sliderId] < totalSlides - 1) {
			sliderIndices[sliderId]++;
		} else if (direction === "prev" && sliderIndices[sliderId] > 0) {
			sliderIndices[sliderId]--;
		}

		// Calculate the exact scroll offset based on the current index
		const offset = slides[sliderIndices[sliderId]].offsetLeft;

		// Set the flag to indicate a button scroll and scroll to the calculated offset
		isButtonScroll[sliderId] = true;
		slider.scrollTo({
			left: offset,
			behavior: "smooth",
		});

		// Clear the flag after a short delay to allow the scroll to complete
		setTimeout(() => {
			isButtonScroll[sliderId] = false;
		}, 500); // Adjust delay based on the smooth scroll speed
	};

	// Swipe and scroll detection for each slider
	document
		.querySelectorAll(".wp-block-schmitzoide-slider")
		.forEach((slider) => {
			let startX;
			const sliderId = slider.getAttribute("data-slider-id");

			// Swipe handling
			slider.addEventListener("touchstart", (e) => {
				startX = e.touches[0].clientX;
			});

			slider.addEventListener("touchend", (e) => {
				const endX = e.changedTouches[0].clientX;

				if (startX - endX > 50) {
					window.scrollSlider("next", sliderId);
				} else if (endX - startX > 50) {
					window.scrollSlider("prev", sliderId);
				}
			});

			// Scroll detection to update the index based on manual scroll
			slider.addEventListener("scroll", () => {
				// Skip index update if scroll was triggered by a button
				if (isButtonScroll[sliderId]) return;

				const slides = slider.querySelectorAll(
					".wp-block-schmitzoide-slider-item",
				);
				const slideWidth = slides[0].offsetWidth;

				// Calculate the nearest index based on current scroll position
				const newIndex = Math.round(slider.scrollLeft / slideWidth);

				// Update the index only if it has changed to prevent unnecessary recalculations
				if (newIndex !== sliderIndices[sliderId]) {
					sliderIndices[sliderId] = newIndex;
				}
			});
		});
})();
