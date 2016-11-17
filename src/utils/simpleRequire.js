/**
 * I wrote a quick version of AMD. Not as many features as RequireJS or Webpack.
 * It does however get me dependency management very quickly without any build
 * tools. AMD works pretty well with SPDY/HTTP2.
 */
let fileMap = {};
let filePromises = {};

function processJSFile(path, text) {
    let pathFinder = /require\(\'(.*?)\'\)/g;
    let dependentFiles = [];

    while (pathFinder !== null) {
        let searchResult = pathFinder.exec(text);
        if (searchResult === null) { break; }

        let depedencyPath = searchResult[1];

        dependentFiles.push(depedencyPath);
    }

    return require(dependentFiles, function() {
        // this is a safe eval since we are only loading scripts we've created
        eval(text.replace('define(', `define("${path}",`));
    });
}

function JSLoadError(path) {
    this.name = 'JSLoadError';
    this.message = `Error loading ${path}`;
}

function makeRequest(path) {
    if (filePromises[path]) {
        return filePromises[path];
    }

    let requestPromise = new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.addEventListener('load', function() {
            processJSFile(path, this.responseText).then(function() {
                resolve()
            });
        });
        request.addEventListener('error', function(event) {
            reject(new JSLoadError(path));
            throw new JSLoadError(path);
        });
        request.open('GET', window.requireSettings.baseURL + path);
        request.send();
    });

    filePromises[path] = requestPromise;

    return requestPromise;
}

function define(path, callback) {
    fileMap[path] = callback(function(path) {
        return fileMap[path];
    });
}

function require(paths, callback) {
    return Promise.all(paths.map(function(path) {
        return makeRequest(path);
    })).then(function() {
        callback.apply(
            null,
            paths.map(function(path) { return fileMap[path]; })
        );
    });
}
