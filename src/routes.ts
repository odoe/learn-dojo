export default [
	// {
	// 	path: 'home',
	// 	outlet: 'home',
	// 	defaultRoute: true
	// },
	{
		path: '/{path}',
		outlet: 'blog',
		defaultRoute: true
		// children: [
		// 	{
		// 		path: '{path}',
		// 		outlet: 'blog-post'
		// 	}
		// ]
	}
];
