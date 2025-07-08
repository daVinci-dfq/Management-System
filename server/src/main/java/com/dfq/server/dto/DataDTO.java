package com.dfq.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class DataDTO {

  private Integer status;

  private String msg;

  private Object data;

  public Map getMap() {
    assert data instanceof Map;
    return (Map)data;
  }
}
