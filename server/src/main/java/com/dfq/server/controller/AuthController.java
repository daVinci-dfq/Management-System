package com.dfq.server.controller;

import com.dfq.server.service.UserService;
import com.dfq.server.vo.DataTrans;
import com.dfq.server.vo.request.DataRequest;
import com.dfq.server.vo.response.DataResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  UserService userService;

  @PostMapping("/register")
  public DataResponse register(@RequestParam @Valid DataRequest dataRequest) {
    DataTrans dataTrans = userService.register(new DataTrans(null, null, dataRequest.getMap()));
    assert dataTrans != null;
    if (dataTrans.getStatus() == 200) {
      return DataResponse.success(dataTrans);
    } else {
      return DataResponse.error(dataTrans.getMsg());
    }
  }

}
