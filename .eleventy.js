const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
	let metadata = await Image(src, {
		widths: [320, 640, 960, 1200, 1800, 2400],
		formats: ["avif", "webp", "jpeg"],
		outputDir: "./_site/img/",
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy(`img/*.jpg`);
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	return {
		templateFormats: ["njk", "html"],
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
	};
};
