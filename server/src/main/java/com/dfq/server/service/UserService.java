package com.dfq.server.service;

import com.dfq.server.model.User;
import com.dfq.server.repository.UserRepository;
import com.dfq.server.vo.DataTrans;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  public DataTrans register(DataTrans dataTrans) {
    User newUser = (User)dataTrans.getData();
    DataTrans response = new DataTrans(200, "注册成功", null);
    try {
      userRepository.save(newUser);
    } catch (Exception e) {
      response = new DataTrans(500, "注册失败", null);
    }
    return response;
  }
}
