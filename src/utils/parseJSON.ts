import IUser from "./interfaces";

export function parseJsonBody(request): Promise<IUser> {
    return new Promise((resolve, reject) => {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            try {
                const jsonData = JSON.parse(body);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });
    });
}
