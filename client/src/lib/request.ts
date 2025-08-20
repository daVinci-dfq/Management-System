import { BASE_URL } from "./constant";

export interface DataRequest {
  url: string;
  method: string;
  body?: unknown;
};

export interface DataResponse {
  code: number;
  msg?: string;
  body: unknown;
};

export const sendRequest = async (dataRequest: DataRequest): Promise<DataResponse> => {

  let dataResponse: DataResponse = { code: 500, msg: "Server Error", body: null };

  const request: Request = new Request(BASE_URL + dataRequest.url, {
    method: dataRequest.method.toUpperCase(),
    headers: new Headers({
      "mode": "cors",
      "Content-Type": "application/json",
    }),
    body: dataRequest.body === undefined ? null : JSON.stringify(dataRequest.body),
  });

  console.log('Sending request to ' + request.url + ' with body: ', dataRequest);

  await fetch(request)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP network error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      dataResponse = data;
    })
    .catch((error) => {
      console.error("Error: ", dataResponse.msg);
      throw error;
    });
  return dataResponse;
};
