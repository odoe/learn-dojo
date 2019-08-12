const path = require('path');
const fs = require('fs-extra');
const directoryPath = path.join(__dirname, '../posts');
const dojorcPath = path.join(__dirname, '../.dojorc');

// read dojorc first
fs.readJson(dojorcPath, (error, dojorc) => {
	if (error) throw error;

	// read the posts directory
	fs.readdir(directoryPath, function(err, files) {
		//handling error
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}

		const posts = files
			.filter(function(file) {
				// don't include the template
				return file !== `template.md`;
			})
			.sort()
			.map(function(file) {
				// remove the file extension
				return file.replace('.md', '');
			});

		dojorc['build-app']['build-time-render'].paths = posts;
		dojorc['build-app']['build-time-render'].paths.push('.');
		fs.writeJson(dojorcPath, dojorc, { spaces: 2 }, (err) => {
			if (err) throw err;
			console.log('.dojorc updated');
		});
	});
});
