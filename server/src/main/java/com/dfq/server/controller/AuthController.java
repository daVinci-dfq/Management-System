package com.dfq.server.controller;

import com.dfq.server.service.UserService;
import com.dfq.server.vo.DataTrans;
import com.dfq.server.vo.request.DataRequest;
import com.dfq.server.vo.response.DataResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

  @Autowired
  UserService userService;

  @PostMapping("/register")
  public DataResponse register(@RequestBody @Valid DataRequest dataRequest) {
    DataTrans dataTrans = userService.register(new DataTrans(null, null, dataRequest.getMap()));
    assert dataTrans != null;
    if (dataTrans.getStatus() == 200) {
      return DataResponse.success(dataTrans);
    } else {
      return DataResponse.error(dataTrans.getMsg());
    }
  }

}
