package com.dfq.server.dto.request;

import lombok.Data;

@Data
public class DataRequest {

  Object data;

  public Integer getInteger() {
    assert data instanceof Integer;
    return (Integer)data;
  }

}
