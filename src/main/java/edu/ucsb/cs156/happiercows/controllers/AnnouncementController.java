package edu.ucsb.cs156.happiercows.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import edu.ucsb.cs156.happiercows.entities.Announcement;
import edu.ucsb.cs156.happiercows.repositories.AnnouncementRepository;

import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;

import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.Optional;

@Tag(name = "Announcement")
@RequestMapping("/api/announcement")
@RestController
@Slf4j
public class AnnouncementController extends ApiController{

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private UserCommonsRepository userCommonsRepository;

    @Autowired
    ObjectMapper mapper;

    @Operation(summary = "Get all announcements", description = "Get all announcements associated with a specific commons. Used only by admins")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/get")
    public ResponseEntity<Object> getAllChatMessages(@Parameter(description = "The id of the common") @RequestParam Long commonsId,
                                                    @Parameter(name="page") @RequestParam int page,
                                                    @Parameter(name="size") @RequestParam int size) {
        
        // Return the list of chat messages
        Page<Announcement> messages = announcementRepository.findByCommonsId(commonsId, PageRequest.of(page, size, Sort.by("start").descending()));
        return ResponseEntity.ok(messages);
    }
    
    @Operation(summary = "Create an announcement", description = "Create an announcement associated with a specific commons")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/post")
    public ResponseEntity<Object> createAnnouncement(@Parameter(description = "The id of the associated common") @RequestParam Long commonsId,
                                                    @Parameter(description = "datetime to start showing the announcement, defaults to current datetime") @RequestParam LocalDateTime start,
                                                    @Parameter(description = "datetime to stop showing the announcement, can be left blank") @RequestParam LocalDateTime end,
                                                    @Parameter(description = "The announcement to be posted") @RequestParam String announcement) {
        
        // Create the announcement
        Announcement announcementObj = Announcement.builder()
        .commonsId(commonsId)
        .start(start)
        .end(end)
        .announcement(announcement)
        .build();

        // Save the announcement
        announcementRepository.save(announcementObj);

        return ResponseEntity.ok(announcementObj);
    }

}
