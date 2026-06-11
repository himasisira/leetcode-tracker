package com.leetcode.backend.repository;

import com.leetcode.backend.entity.UserProblem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProblemRepository
        extends JpaRepository<UserProblem, Long> {

    List<UserProblem> findByUser_Id(Long userId);

}