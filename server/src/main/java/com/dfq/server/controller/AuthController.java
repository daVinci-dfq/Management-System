package com.dfq.server.controller;

import com.dfq.server.dto.UserDTO;
import com.dfq.server.service.UserService;
import com.dfq.server.dto.DataDTO;
import com.dfq.server.dto.response.DataResponse;
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
  public DataResponse register(@RequestBody @Valid UserDTO userDTO) {
    DataDTO dataDTO = userService.register(userDTO);
    assert dataDTO != null;
    if (dataDTO.getStatus() == 200) {
      return DataResponse.success(dataDTO);
    } else {
      return DataResponse.error(dataDTO.getMsg());
    }
  }

}
