package com.dfq.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DataResponse {

  Integer code;

  String msg;

  Object data;

  public static DataResponse success() {
    return new DataResponse(200, "操作成功", null);
  }

  public static DataResponse success(Object data) {
    return new DataResponse(200, "操作成功", data);
  }

  public static DataResponse error(String msg) {
    return new DataResponse(400, msg, null);
  }

}
