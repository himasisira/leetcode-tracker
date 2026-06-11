package com.leetcode.backend.service;

import com.leetcode.backend.entity.UserProblem;
import com.leetcode.backend.repository.UserProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProblemService {

    @Autowired
    private UserProblemRepository userProblemRepository;

    public List<UserProblem> getUserProblems(Long userId) {

        return userProblemRepository.findByUser_Id(userId);

    }

    public UserProblem save(UserProblem userProblem) {

        return userProblemRepository.save(userProblem);

    }

}