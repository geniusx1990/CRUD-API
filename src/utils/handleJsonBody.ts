export function handleJsonBody(request, callback) {
    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        try {
            const jsonData = JSON.parse(body);
            request.body = jsonData;
            callback(null, request.body);
        } catch (error) {
            callback(error);
        }
    });
}