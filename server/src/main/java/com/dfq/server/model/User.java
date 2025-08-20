package com.dfq.server.model;

import com.dfq.server.constant.GenderType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

/**
 * User entity class.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  @NonNull
  @Enumerated(EnumType.ORDINAL)
  private GenderType gender;

  @Column(nullable = false, length = 11,  unique = true)
  private String number;

  @NotBlank
  private String password;

  @Column(nullable = false, length = 18,  unique = true)
  private String idCard;
}
