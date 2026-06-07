package com.leetcode.backend.service;

import com.leetcode.backend.entity.Problem;
import com.leetcode.backend.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    // CREATE
    public Problem saveProblem(Problem problem) {
        return problemRepository.save(problem);
    }

    // READ ALL
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    // READ BY ID
    public Problem getProblemById(Long id) {
        return problemRepository.findById(id).orElse(null);
    }

    // UPDATE
    public Problem updateProblem(Long id,
                                 Problem updatedProblem) {

        Problem problem =
                problemRepository.findById(id)
                        .orElse(null);

        if (problem != null) {

            problem.setTitle(
                    updatedProblem.getTitle()
            );

            problem.setDifficulty(
                    updatedProblem.getDifficulty()
            );

            problem.setStatus(
                    updatedProblem.getStatus()
            );

            problem.setTopic(
                    updatedProblem.getTopic()
            );

            problem.setLeetcodeLink(
                    updatedProblem.getLeetcodeLink()
            );

            problem.setFavorite(
                    updatedProblem.getFavorite()
            );

            // Auto save solved date
            if ("Solved".equals(
                    updatedProblem.getStatus())) {

                if (problem.getSolvedDate() == null) {

                    problem.setSolvedDate(
                            LocalDate.now()
                    );

                }

            } else {

                problem.setSolvedDate(null);

            }

            return problemRepository.save(problem);
        }

        return null;
    }

    // DELETE
    public String deleteProblem(Long id) {

        if (problemRepository.existsById(id)) {

            problemRepository.deleteById(id);

            return "Problem deleted successfully!";
        }

        return "Problem not found!";
    }

    // GET BY USER ID
    public List<Problem> getProblemsByUserId(Long userId) {

        return problemRepository.findByUserId(userId);

    }

}