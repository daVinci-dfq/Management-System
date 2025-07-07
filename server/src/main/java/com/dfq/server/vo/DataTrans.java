package com.dfq.server.vo;

import com.dfq.server.vo.request.DataRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class DataTrans {

  private Integer status;

  private String msg;

  private Object data;

}
