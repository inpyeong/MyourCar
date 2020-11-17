package com.MyourCar.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class TimeUtils {

    public static Timestamp parseTimestamp(String timestamp) {
        try {
            return new Timestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(timestamp).getTime());
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public static String transferDateTime(String dateTime) {
        LocalDateTime today = LocalDateTime.now();
        System.out.println(today);

        if(dateTime.length() == 2) {
            if(dateTime.equals("오늘"))
                dateTime = today.toString().substring(0, 10);
            else if(dateTime.equals("내일"))
                dateTime = today.plusDays(1).toString().substring(0, 10);
        }
        return dateTime;
    }
}
