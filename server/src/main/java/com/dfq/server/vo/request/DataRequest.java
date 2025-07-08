package com.dfq.server.vo.request;

import lombok.Data;

import java.util.Map;

@Data
public class DataRequest {

  Object data;

  public Integer getInteger() {
    assert data instanceof Integer;
    return (Integer)data;
  }

}
