package com.example.demo.repository;

import com.example.demo.entity.History;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HistoryRepository extends JpaRepository<History, UUID> {
    List<History> findAllByUser(User user);
}
