import { BASE_URL } from "./constant";

export interface DataRequest {
  method: string;
  url: string;
  body?: unknown;
};

export interface DataResponse {
  status: number;
  msg?: string;
  body: unknown;
};

export const sendRequest = async (dataRequest: DataRequest): Promise<DataResponse> => {
  const dataResponse: DataResponse = {
    status: 200,
    msg: "OK",
    body: null,
  };

  const request: Request = new Request(BASE_URL + dataRequest.url, {
    method: dataRequest.method.toUpperCase(),
    headers: new Headers({
      "mode": "cors",
      "Content-Type": "application/json",
    }),
    body: dataRequest.body !== undefined ? JSON.stringify(dataRequest.body) : undefined,
  });

  console.log('Sending request to ' + request.url + ' with body: ', dataRequest.body);

  await fetch(request)
    .then((response) => {
      dataResponse.status = response.status;
      dataResponse.msg = response.statusText;
      if (!response.ok)
        throw new Error(`HTTP network error! status: ${response.status}`);
      else
        console.log('Send request to ' + request.url);
      return response.json();
    })
    .then((data) => {
      dataResponse.body = data;
    })
    .catch((error) => {
      console.error("Error: ", error);
      throw error;
    });
  
  return dataResponse;
};
