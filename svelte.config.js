import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: preprocess({
		typescript: true, 
		scss: {
			includePaths: ['src']
		}
	})
};

export default config;
