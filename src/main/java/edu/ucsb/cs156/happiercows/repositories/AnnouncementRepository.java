package edu.ucsb.cs156.happiercows.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.happiercows.entities.Announcement;

@Repository
public interface AnnouncementRepository extends CrudRepository<Announcement, Long> {
    @Query(value = "SELECT a FROM announcement a WHERE a.commonsId = :commonsId")
    Page<Announcement> findByCommonsId(Long commonsId, Pageable pageable);

    @Query("SELECT a FROM announcement a WHERE a.id = :id")
    Optional<Announcement> findById(long id);
}
