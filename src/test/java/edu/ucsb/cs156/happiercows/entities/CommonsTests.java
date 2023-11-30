package edu.ucsb.cs156.happiercows.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

public class CommonsTests {

    LocalDateTime dt1 = LocalDateTime.parse("2023-01-01T00:00:00.000");
    LocalDateTime dt2 = LocalDateTime.parse("2012-12-31T12:12:12.121");
    LocalDateTime dt3 = LocalDateTime.parse("2023-12-31T23:59:59.999");
    LocalDateTime dt4 = LocalDateTime.parse("2024-12-31T23:59:59.999");

    @Test
    void test_gameInProgress_True() throws Exception {
        assertEquals(true, Commons.builder().startingDate(dt1).lastDate(dt3).build().gameInProgress());
    }

    @Test
    void test_gameInProgress_False_Not_Started() throws Exception {
        assertEquals(false, Commons.builder().startingDate(dt3).lastDate(dt4).build().gameInProgress());
    }

    @Test
    void test_gameInProgress_False_Already_Ended() throws Exception {
        assertEquals(false, Commons.builder().startingDate(dt2).lastDate(dt1).build().gameInProgress());
    }
}
