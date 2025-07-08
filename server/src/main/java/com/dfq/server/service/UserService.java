package com.dfq.server.service;

import com.dfq.server.dto.UserDTO;
import com.dfq.server.model.User;
import com.dfq.server.repository.UserRepository;
import com.dfq.server.dto.DataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  public DataDTO register(UserDTO userDTO) {
    User newUser = userDTO.toUser();
    DataDTO response = new DataDTO(200, "注册成功", null);
    try {
      userRepository.saveAndFlush(newUser);
    } catch (Exception e) {
      response = new DataDTO(500, "注册失败", null);
    }
    return response;
  }
}
