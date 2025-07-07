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

  public Map<String, Object> getMap() {
    assert data instanceof Map;
    return (Map<String, Object>)data;
  }
}
