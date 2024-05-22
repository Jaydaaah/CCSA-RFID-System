"use server";

const baseURL = "http://localhost:8080/";

const ServerLink = (path: string) => {
    if (URL.canParse(path, baseURL)) {
        return new URL(path, baseURL);
    }
    return "";
};

function fetchBaseWrapper<type>(
    path: string,
    ok_response_fn: (res: Response) => Promise<type>,
    init?: RequestInit
) {
    return async function () {
        try {
            const link = ServerLink(path);
            if (link) {
                const response = await fetch(link, init);
                if (response.ok) {
                    return ok_response_fn(response);
                } else {
                    console.log(`${response.status} fetch response from ${path} msg: ${await response.text()}`);
                }
            }
            return null;
        }
        catch (error) {
            console.error(`fetch (${path}): Encounter an Error: ${error}`)
            return null;
        }
    };
}

function fetchWrapper<type>(path: string, init?: RequestInit) {
    return fetchBaseWrapper<type>(
        path,
        async (res) => {
            const resp_json: type = await res.json();
            return resp_json;
        },
        init
    );
}

function fetchStatusWrapper(path: string, init?: RequestInit) {
    return fetchBaseWrapper<boolean>(
        path,
        async (res) => {
            return true;
        },
        init
    );
}

function TemplateRequestInit(
    method: "POST" | "PUT" | "DELETE",
    body?: BodyInit | Record<string, any> | null,
    cache?: RequestCache,
    contentType: string = "application/json"
): RequestInit {
    return {
        headers: {
            "Content-Type": contentType,
        },
        method,
        body: JSON.stringify(body),
        cache: cache
    };
}

// Admin Fetch

type FetchAllAccountsResponse = Record<string, string>[]

export async function FetchAllAccounts() {
    const fetchW = fetchWrapper<FetchAllAccountsResponse>("/admin/accounts");
    const response = await fetchW();
    return response ?? [];
}

export async function FetchAllAccountsPre() {
    const fetchW = fetchWrapper<FetchAllAccountsResponse>("/admin/accounts", {cache: "no-store"});
    const response = await fetchW();
    return response ?? [];
}

interface FetchCreateAccountResponse {
    _id: string;
}

export async function FetchCreateAccount(accountData: Record<string, string>) {
    const fetchW = fetchWrapper<FetchCreateAccountResponse>(
        "/admin/accounts",
        TemplateRequestInit("POST", accountData)
    );
    return await fetchW();
}

export async function FetchDeleteAccount(_id: string) {
    const fetchS = fetchStatusWrapper(
        "/admin/accounts",
        TemplateRequestInit("DELETE", { _id })
    );
    const response = await fetchS();
    return response ?? false;
}

export async function FetchUpdateAccount(
    _id: string, update: Record<string, string>
) {
    const fetchS = fetchStatusWrapper(
        `/admin/accounts`,
        TemplateRequestInit("PUT", {_id, update}, "no-store"),
    );
    return (await fetchS()) ?? false;
}

export async function FetchImageUpdate(_id: string, image: Blob) {
    const fetchS = fetchStatusWrapper(`/admin/accounts/image/${_id}`, {
        headers: {
            "Content-Type": "image/jpeg",
        },
        method: "PUT",
        body: image,
    });
    return (await fetchS()) ?? false;
}

// Active Fetch

interface responselogin {
    _id: string;
}

export async function LoginFetch(rfid: string) {
    const fetchW = fetchWrapper<responselogin>(`/login/${rfid}`);
    return await fetchW();
}

interface FetchAccountDataResponse {
    ccsaID: string;
    stdName: string;
    course: string;
}

export async function FetchAccountData(_id: string) {
    const fetchW = fetchWrapper<FetchAccountDataResponse>(`/retrieve/${_id}`);
    return (await fetchW()) ?? {};
}

export async function FetchAccountImage(_id: string) {
    const fetchBw = fetchBaseWrapper(`/retrieve/${_id}/image`, async (res) => {
        const imageBuffer = await res.blob();
        return imageBuffer;
    },{cache: "no-store"});
    return await fetchBw();
}
