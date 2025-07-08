package com.dfq.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * User entity class.
 */

@Data
@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  @NotBlank
  private Integer gender;

  @NotBlank
  @Size(min = 11,  max = 11)
  private String number;

  @NotBlank
  private String password;

  @NotBlank
  @Size(min = 18, max = 18)
  private String idCard;

}
