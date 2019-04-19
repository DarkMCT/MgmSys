
// back-end url
const base_url = "http://localhost:3001";

const header = new Headers();
header.set("content-type", "application/json");


// This function is intended to forward the request in a single place and thus
// it will be possible to encrypt all transferred data
const make_request = (url, method, body) => {
    return (
        fetch(base_url + url, {
            headers: header,
            credentials: "include",
            method: method,
            mode: "cors",
            body: body,
        })
    );
}

export { make_request };