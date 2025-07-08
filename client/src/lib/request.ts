import { BASE_URL } from "./constant";

export interface DataRequest {
  data?: unknown;
};

export interface DataResponse {
  status: number;
  msg?: string;
  body: unknown;
};

export const sendRequest = async (url: string, method: string, dataRequest: DataRequest): Promise<DataResponse> => {
  const dataResponse: DataResponse = {
    status: 200,
    msg: "OK",
    body: null,
  };

  const request: Request = new Request(BASE_URL + url, {
    method: method.toUpperCase(),
    headers: new Headers({
      "mode": "cors",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(dataRequest),
  });

  console.log('Sending request to ' + request.url + ' with body: ', dataRequest);

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
