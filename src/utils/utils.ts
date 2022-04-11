export function ignore(content: any) {
    let devnull = require('dev-null');

    content.pipe(devnull());
}
