import RequestType from "./requestType.ts";

export function getRequestOptions(type: RequestType, target: Object) {
    return {
        method: type.toString(),
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(target)
    }
}