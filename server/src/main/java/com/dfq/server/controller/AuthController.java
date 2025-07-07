package com.dfq.server.controller;

import com.dfq.server.vo.request.DataRequest;
import com.dfq.server.vo.response.DataResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/auth")
public class AuthController {

  @PostMapping("/register")
  public DataResponse register(@RequestParam @Valid DataRequest dataRequest) {

    return new DataResponse();
  }

}
